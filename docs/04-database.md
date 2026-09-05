# Database Design

## Principle

The database stores **Spotinder-owned application state**, while Spotify
remains the source of truth for music catalog data.

This avoids duplicating entire artist, album, and track catalogs.

## Main Persisted Domains

### User

Stores the connected Spotify user and Spotinder preferences, including
Spotify identity, profile information, Spotify product type, Adventure
Mode, Blind Mode, onboarding state, and selected genres used for
fresh-account bootstrapping.

The profile image is nullable because Spotify accounts are not required
to have an avatar.

### Swipe

Stores each Like/Pass decision and associates it with the user and
Spotify track. Swipe history is both product data and recommendation
feedback.

### Discovery Session

Stores discovery-session information used by journey and discovery
experiences.

### Playlist / PlaylistTrack

Stores Spotinder-created playlist references and the Spotify track IDs
associated with them. Spotify remains the actual playlist host.

### UserAchievement

Stores achievements unlocked by a user.

### AccessRequest

Stores early-access requests and their status during the Spotify
Development Mode period.

## Why UUIDs?

Application entities use UUIDs where appropriate to avoid sequential
public identifiers and to remain friendly to future distributed
deployment.

## What Is Not Mirrored as a Full Catalog?

Spotinder does not maintain a local copy of Spotify's: - artists; -
albums; - entire track catalog; - audio files.

Track/artist metadata required during discovery is retrieved from
Spotify and transformed into application DTO/model objects.

## Data Flow

``` text
Spotify profile/listening data ---> Taste model (runtime)
                                     |
Spotinder swipes --------------------+
                                     |
                                     v
                              Recommendations

Spotinder-owned state ------------> PostgreSQL
Spotify-owned catalog ------------> Spotify Web API
```
