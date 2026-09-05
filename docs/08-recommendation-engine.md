# How Spotinder Recommendations Work

This document describes the current backend recommendation pipeline.

The important idea is that Spotinder separates **what the user likes**,
**where the system should explore**, **which tracks are available**, and
**how the final deck is ranked/composed**.

## Pipeline

``` text
                Spotify top artists / tracks
                           +
                    Spotinder swipes
                           |
                           v
                  TasteProfileBuilder
                           |
                           v
                 GenreTasteClassifier
                           |
                           v
                GenreExplorationService
                           |
                           v
                  ExplorationPlanner
                    (Adventure Mode)
                           |
                           v
             DiscoveryCandidateGenerator
                           |
                           v
               RecommendationEngine.rank
                           |
                           v
             RecommendationEngine.compose
                           |
                           v
                 Final discovery pool
                    (up to 40 tracks)
```

## 1. Build the Taste Profile

`TasteProfileBuilder` combines two families of evidence.

### Spotify evidence

Spotify top artists and top tracks establish the user's starting taste.
The profile contains Spotify artist and genre affinities.

### Spotinder evidence

Like/Pass history adds discovery-specific feedback.

The taste profile tracks: - Spotify artist affinity; - Spotify genre
affinity; - discovery artist affinity; - discovery genre affinity; -
liked track IDs; - passed track IDs; - total swipe count.

Behavioral affinity includes both **preference** and **confidence**.
Confidence grows with interaction evidence rather than treating a single
swipe as a fully established preference.

The implementation uses a confidence curve based on interaction count:

``` text
confidence = 1 - exp(-interactions / 3)
```

Passes are intentionally weighted less strongly than positive Likes when
building preference evidence.

## 2. Classify Genre Taste

`GenreTasteClassifier` interprets the combined profile and assigns genre
states:

-   `CORE` --- strong established taste;
-   `KNOWN` --- clearly part of the user's taste;
-   `EMERGING` --- promising territory discovered through Spotinder;
-   `UNCERTAIN` --- evidence exists but is not decisive;
-   `AVOID` --- meaningful negative discovery evidence;
-   `UNKNOWN` --- no meaningful evidence.

This turns raw affinity values into a semantic map of the user's musical
territory.

## 3. Explore Genre Neighborhoods

`GenreExplorationService` starts graph exploration from established
`CORE` and `KNOWN` genres.

The genre-neighborhood graph produces possible destinations with
information such as: - graph distance; - parent genre; - connection/path
strength; - path through the genre graph.

This creates a landscape containing both familiar and increasingly
distant musical territory.

## 4. Adventure Mode Builds an Exploration Plan

`ExplorationPlanner` converts the user's Adventure Mode value (0--100)
into a plan of ten genre neighborhoods.

The plan uses four buckets:

-   `ANCHOR` --- established musical territory;
-   `EMERGING` --- promising taste learned through discovery;
-   `NEARBY` --- adjacent exploration;
-   `FRONTIER` --- more distant exploration.

At the conservative end, the intended mix is approximately:

``` text
Anchor    80%
Emerging  10%
Nearby    10%
Frontier   0%
```

At the exploratory end:

``` text
Anchor    10%
Emerging  15%
Nearby    30%
Frontier  45%
```

Weights are interpolated between those endpoints.

This is an important design choice: **Adventure Mode does not simply
increase a random/exploration score on every track. It changes which
musical neighborhoods are allowed into the candidate plan.**

If one bucket cannot fill its allocation, the planner redistributes
unused capacity according to the current Adventure mixture.

## 5. Generate Candidates

`DiscoveryCandidateGenerator` uses each planned genre to find matching
Spotify artists and tracks.

Candidate generation: - searches artists for planned genres; - validates
genre matches; - searches tracks for those artists; - excludes already
swiped tracks; - de-duplicates exact tracks; - also de-duplicates
equivalent artist/title identities; - attaches a `CandidateOrigin`
describing the planned genre, exploration bucket, graph distance, path
strength, and path.

The origin metadata is important because ranking can evaluate not only
the track's taste match, but also *why it entered the discovery pool*.

## 6. Filter Invalid or Unwanted Candidates

Before scoring, `RecommendationEngine.rank` rejects candidates that: -
have no track ID; - have no title; - have no artist; - were already
swiped; - are shorter than 60 seconds; - have no origin metadata.

This keeps the ranking stage focused on valid discovery candidates.

## 7. Calculate Taste Score

The taste score combines four signals:

``` text
35% Spotify artist affinity
25% Spotify genre affinity
25% Spotinder discovery artist affinity
15% Spotinder discovery genre affinity
```

For Spotinder behavioral affinities, preference is multiplied by
confidence before contributing to the score.

This means the engine starts with the user's established Spotify taste
but increasingly has room to learn from behavior inside Spotinder.

## 8. Combine Taste and Exploration Origin

Each accepted candidate receives:

``` text
finalScore =
    0.65 * tasteScore
  + 0.35 * originScore
```

Taste therefore remains the dominant signal, while the candidate's
exploration origin still meaningfully affects ranking.

Adventure Mode is deliberately not represented as a direct scoring
weight here; it already shaped the candidate territory in the planning
stage.

## 9. Compose a Diverse Deck

After global ranking, `RecommendationEngine.compose` groups candidates
by planned genre/neighborhood and composes the final list while
preserving diversity.

The engine also limits repeated exposure from the same artist
(`MAX_TRACKS_PER_ARTIST = 2`).

The result is not simply "take the 40 highest numerical scores."
Composition preserves the exploration plan so a single familiar genre or
artist cannot dominate the entire deck.

## 10. Final Discovery Pool

`DiscoveryService` maps the composed candidates to the API response and
returns up to **40 tracks**.

The full runtime flow is therefore:

``` text
User
 -> Taste
 -> Musical territory
 -> Adventure-controlled exploration
 -> Spotify candidates
 -> Filtering
 -> Personalized ranking
 -> Diversity composition
 -> Swipe deck
```

## Cold Start: New Spotify Accounts

A new Spotify account may have little or no top-listening history.

Spotinder handles this during onboarding by asking the user to choose
exactly three genres. Those genres bootstrap the user's affinity data so
the regular recommendation pipeline can still build established musical
territory and generate a deck.

This avoids maintaining a separate "new user recommendation engine."

## Feedback Loop

Every Like/Pass is persisted. On future discovery requests, swipe
history contributes to the taste profile and already-swiped tracks are
excluded.

Conceptually:

``` text
Recommendation
     |
     v
User swipe
     |
     +------ Like / Pass evidence
     |
     v
Persisted swipe history
     |
     v
Next TasteProfile
     |
     v
Updated recommendations
```

The result is a recommendation system that begins with Spotify knowledge
but learns from Spotinder-specific discovery behavior.
