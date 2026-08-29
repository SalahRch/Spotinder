package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.model.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class RecommendationEngine {

    private static final double SPOTIFY_ARTIST_WEIGHT = 0.35;
    private static final double SPOTIFY_GENRE_WEIGHT = 0.25;

    private static final double DISCOVERY_ARTIST_WEIGHT = 0.25;
    private static final double DISCOVERY_GENRE_WEIGHT = 0.15;

    private static final int MAX_TRACKS_PER_ARTIST = 2;

    /*
     * Experimental V2 scoring weights.
     *
     * Adventure is NOT represented here.
     */
    private static final double TASTE_WEIGHT = 0.65;
    private static final double ORIGIN_WEIGHT = 0.35;

    private static final int MIN_DURATION_MS = 60_000;


    public List<ScoredCandidate> rank(
            TasteProfile profile,
            List<DiscoveryCandidate> candidates
    ) {

        if (
                candidates == null
                        || candidates.isEmpty()
        ) {
            return List.of();
        }


        Set<String> swipedTracks =
                Stream.concat(
                                profile.likedTrackIds().stream(),
                                profile.passedTrackIds().stream()
                        )
                        .collect(
                                Collectors.toSet()
                        );


        int missingTrackId = 0;
        int missingTitle = 0;
        int missingArtist = 0;
        int alreadySwiped = 0;
        int tooShort = 0;
        int missingOrigin = 0;


        List<ScoredCandidate> ranked =
                new ArrayList<>();


        for (DiscoveryCandidate candidate : candidates) {

            if (candidate.trackId() == null) {
                missingTrackId++;
                continue;
            }

            if (
                    candidate.title() == null
                            || candidate.title().isBlank()
            ) {
                missingTitle++;
                continue;
            }

            if (
                    candidate.artistName() == null
                            || candidate.artistName().isBlank()
            ) {
                missingArtist++;
                continue;
            }

            if (swipedTracks.contains(candidate.trackId())) {
                alreadySwiped++;
                continue;
            }

            if (
                    candidate.durationMs() != null
                            && candidate.durationMs() < MIN_DURATION_MS
            ) {
                tooShort++;
                continue;
            }

            if (candidate.origin() == null) {
                missingOrigin++;
                continue;
            }


            double tasteScore =
                    calculateTasteScore(
                            candidate,
                            profile
                    );

            double originScore =
                    calculateOriginScore(
                            candidate
                    );

            double finalScore =
                    TASTE_WEIGHT * tasteScore
                            + ORIGIN_WEIGHT * originScore;


            ranked.add(
                    new ScoredCandidate(
                            candidate,
                            tasteScore,
                            originScore,
                            finalScore
                    )
            );
        }


        ranked.sort(
                Comparator.comparingDouble(
                        ScoredCandidate::finalScore
                ).reversed()
        );


        System.out.println();
        System.out.println("========== CANDIDATE FILTERING ==========");
        System.out.println("Raw candidates:       " + candidates.size());
        System.out.println("Missing track ID:     " + missingTrackId);
        System.out.println("Missing title:        " + missingTitle);
        System.out.println("Missing artist:       " + missingArtist);
        System.out.println("Already swiped:       " + alreadySwiped);
        System.out.println("Too short (<60s):     " + tooShort);
        System.out.println("Missing origin:       " + missingOrigin);
        System.out.println("Accepted:             " + ranked.size());
        System.out.println("=========================================");
        System.out.println();


        return List.copyOf(ranked);
    }


    /*
     * =========================================================
     * TASTE SCORE
     * =========================================================
     */

    private double calculateTasteScore(
            DiscoveryCandidate candidate,
            TasteProfile profile
    ) {

        double spotifyArtistScore =
                getSpotifyArtistScore(
                        candidate,
                        profile
                );

        double spotifyGenreScore =
                getSpotifyGenreScore(
                        candidate,
                        profile
                );

        double discoveryArtistScore =
                getDiscoveryArtistScore(
                        candidate,
                        profile
                );

        double discoveryGenreScore =
                getDiscoveryGenreScore(
                        candidate,
                        profile
                );


        return
                SPOTIFY_ARTIST_WEIGHT
                        * spotifyArtistScore
                        +
                        SPOTIFY_GENRE_WEIGHT
                                * spotifyGenreScore
                        +
                        DISCOVERY_ARTIST_WEIGHT
                                * discoveryArtistScore
                        +
                        DISCOVERY_GENRE_WEIGHT
                                * discoveryGenreScore;
    }


    private double getSpotifyArtistScore(
            DiscoveryCandidate candidate,
            TasteProfile profile
    ) {

        if (candidate.artistId() == null) {
            return 0.0;
        }


        return profile.spotifyArtistAffinity()
                .getOrDefault(
                        candidate.artistId(),
                        0.0
                );
    }


    private double getSpotifyGenreScore(
            DiscoveryCandidate candidate,
            TasteProfile profile
    ) {

        if (
                candidate.artistGenres() == null
                        || candidate.artistGenres().isEmpty()
        ) {
            return 0.0;
        }


        return candidate.artistGenres()
                .stream()
                .map(String::toLowerCase)
                .mapToDouble(genre ->
                        profile.spotifyGenreAffinity()
                                .getOrDefault(
                                        genre,
                                        0.0
                                )
                )
                .max()
                .orElse(0.0);
    }


    private double getDiscoveryArtistScore(
            DiscoveryCandidate candidate,
            TasteProfile profile
    ) {

        if (candidate.artistId() == null) {
            return 0.0;
        }


        AffinitySignal signal =
                profile.discoveryArtistAffinity()
                        .get(
                                candidate.artistId()
                        );


        if (signal == null) {
            return 0.0;
        }


        return signal.preference()
                * signal.confidence();
    }


    private double getDiscoveryGenreScore(
            DiscoveryCandidate candidate,
            TasteProfile profile
    ) {

        if (
                candidate.artistGenres() == null
                        || candidate.artistGenres().isEmpty()
        ) {
            return 0.0;
        }


        return candidate.artistGenres()
                .stream()
                .map(String::toLowerCase)
                .map(
                        profile.discoveryGenreAffinity()::get
                )
                .filter(Objects::nonNull)
                .mapToDouble(signal ->
                        signal.preference()
                                * signal.confidence()
                )
                .max()
                .orElse(0.0);
    }

    public List<ScoredCandidate> compose(
            ExplorationPlan plan,
            List<ScoredCandidate> scoredCandidates
    ) {

        if (
                scoredCandidates == null
                        || scoredCandidates.isEmpty()
        ) {
            return List.of();
        }

        Map<String, List<ScoredCandidate>> byGenre =
                new LinkedHashMap<>();


        for (PlannedGenre plannedGenre : plan.genres()) {

            byGenre.put(
                    plannedGenre.genre(),
                    new ArrayList<>()
            );
        }


        for (ScoredCandidate scored : scoredCandidates) {

            String plannedGenre =
                    scored.candidate()
                            .origin()
                            .plannedGenre();

            List<ScoredCandidate> group =
                    byGenre.get(
                            plannedGenre
                    );


            if (group != null) {

                group.add(
                        scored
                );
            }
        }
        /*
         * Rank candidates INSIDE each planned neighborhood.
         *
         * The planner chooses which neighborhoods exist.
         * The recommendation engine chooses the strongest
         * tracks inside each neighborhood.
         */
        byGenre.values()
                .forEach(this::spaceArtistsWithinGenre);


        List<ScoredCandidate> result =
                new ArrayList<>();

        Map<String, Integer> artistCounts =
                new HashMap<>();

        Map<String, Integer> genreIndexes =
                new LinkedHashMap<>();


        byGenre.keySet()
                .forEach(genre ->
                        genreIndexes.put(
                                genre,
                                0
                        )
                );


        boolean addedSomething;


        /*
         * Round-robin:
         *
         * rage rap    -> one
         * melodic rap -> one
         * afro house  -> one
         * horrorcore  -> one
         * ...
         *
         * then start another round.
         */
        do {

            addedSomething = false;


            for (
                    Map.Entry<String, List<ScoredCandidate>> entry
                    : byGenre.entrySet()
            ) {

                String genre =
                        entry.getKey();

                List<ScoredCandidate> group =
                        entry.getValue();

                int index =
                        genreIndexes.get(genre);


                /*
                 * Find the next candidate from this
                 * neighborhood that does not violate
                 * artist diversity.
                 */
                while (index < group.size()) {

                    ScoredCandidate scored =
                            group.get(index);

                    index++;


                    DiscoveryCandidate candidate =
                            scored.candidate();

                    String artistKey =
                            getArtistKey(
                                    candidate
                            );

                    int artistCount =
                            artistCounts.getOrDefault(
                                    artistKey,
                                    0
                            );


                    if (
                            artistCount
                                    >= MAX_TRACKS_PER_ARTIST
                    ) {
                        continue;
                    }


                    result.add(
                            scored
                    );

                    artistCounts.put(
                            artistKey,
                            artistCount + 1
                    );

                    addedSomething = true;

                    break;
                }


                genreIndexes.put(
                        genre,
                        index
                );
            }

        } while (addedSomething);


        return List.copyOf(
                result
        );
    }

    private void spaceArtistsWithinGenre(
            List<ScoredCandidate> group
    ) {

        if (group == null || group.size() <= 1) {
            return;
        }

        /*
         * First preserve recommendation quality:
         * candidates from this neighborhood are ranked
         * by finalScore before we diversify artists.
         */
        group.sort(
                Comparator.comparingDouble(
                        ScoredCandidate::finalScore
                ).reversed()
        );


        /*
         * Group tracks by artist while preserving the
         * order in which artists first appeared in the
         * score-ranked list.
         *
         * Example:
         *
         * A1
         * A2
         * B1
         * B2
         * C1
         * C2
         *
         * becomes artist buckets:
         *
         * A -> [A1, A2]
         * B -> [B1, B2]
         * C -> [C1, C2]
         */
        Map<String, List<ScoredCandidate>> byArtist =
                new LinkedHashMap<>();


        for (ScoredCandidate scored : group) {

            String artistKey =
                    getArtistKey(
                            scored.candidate()
                    );

            byArtist
                    .computeIfAbsent(
                            artistKey,
                            ignored -> new ArrayList<>()
                    )
                    .add(scored);
        }


        /*
         * Round-robin the artists.
         *
         * A1 A2 B1 B2 C1 C2
         *
         * becomes:
         *
         * A1 B1 C1 A2 B2 C2
         */
        List<ScoredCandidate> spaced =
                new ArrayList<>(group.size());

        int round = 0;
        boolean addedSomething;


        do {

            addedSomething = false;


            for (
                    List<ScoredCandidate> artistTracks
                    : byArtist.values()
            ) {

                if (round < artistTracks.size()) {

                    spaced.add(
                            artistTracks.get(round)
                    );

                    addedSomething = true;
                }
            }


            round++;

        } while (addedSomething);


        group.clear();
        group.addAll(spaced);
    }


    /*
     * =========================================================
     * ORIGIN SCORE
     * =========================================================
     */

    private double calculateOriginScore(
            DiscoveryCandidate candidate
    ) {

        CandidateOrigin origin =
                candidate.origin();


        if (origin == null) {
            return 0.0;
        }


        /*
         * IMPORTANT:
         *
         * We do NOT reward graphDistance.
         *
         * Adventure already decided whether this candidate
         * should come from ANCHOR / NEARBY / FRONTIER.
         *
         * pathStrength only measures how strongly supported
         * the route through the genre graph is.
         */

        return origin.pathStrength();
    }

    private String getArtistKey(
            DiscoveryCandidate candidate
    ) {

        return candidate.artistId() != null
                ? candidate.artistId()
                : candidate.artistName();
    }
}