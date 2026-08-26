package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.discovery.model.*;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class RecommendationEngine {


    private static final double SPOTIFY_ARTIST_WEIGHT = 0.35;
    private static final double SPOTIFY_GENRE_WEIGHT = 0.25;

    private static final double DISCOVERY_ARTIST_WEIGHT = 0.25;
    private static final double DISCOVERY_GENRE_WEIGHT = 0.15;


    private static final int MAX_RECOMMENDATIONS = 50;


    private static final int MAX_TRACKS_PER_ARTIST = 2;

    private static final int MIN_DURATION_MS = 60_000;


    public RecommendationEngine(
    ) {
    }


    public List<SongResponse> generateRecommendations(
            List<DiscoveryCandidate> candidates,
            TasteProfile profile,
            int adventureLevel
    ) {
        Set<String> swipedTracks =
                Stream.concat(
                                profile.likedTrackIds().stream(),
                                profile.passedTrackIds().stream()
                        )
                        .collect(
                                Collectors.toSet()
                        );

        List<ScoredCandidate> ranked =
                candidates.stream()

                        .filter(candidate ->
                                candidate.trackId() != null
                        )

                        .filter(candidate ->
                                candidate.title() != null &&
                                        !candidate.title().isBlank()
                        )

                        .filter(candidate ->
                                candidate.artistName() != null &&
                                        !candidate.artistName().isBlank()
                        )

                        .filter(candidate ->
                                !swipedTracks.contains(
                                        candidate.trackId()
                                )
                        )

                        .filter(candidate ->
                                candidate.durationMs() == null ||
                                        candidate.durationMs() >=
                                                MIN_DURATION_MS
                        )

                        .map(candidate -> {

                            double score =
                                    calculateFinalScore(
                                            candidate,
                                            profile,
                                            adventureLevel
                                    );

                            return new ScoredCandidate(
                                    candidate,
                                    score
                            );
                        })

                        .sorted(
                                Comparator.comparingDouble(
                                        ScoredCandidate::score
                                ).reversed()
                        )

                        .toList();

        List<ScoredCandidate> diversified =
                rerankForDiversity(
                        ranked
                );

        System.out.println(
                "\n=== FINAL DISCOVERY RANKING ==="
        );

        for (int i = 0; i < diversified.size(); i++) {

            ScoredCandidate scored =
                    diversified.get(i);

            DiscoveryCandidate candidate =
                    scored.candidate();

            System.out.printf(
                    "%2d. %-28s | %-18s | final=%+.3f taste=%.3f novelty=%.2f%n",
                    i + 1,
                    candidate.title(),
                    candidate.artistName(),
                    scored.score(),
                    calculateTasteScore(
                            candidate,
                            profile
                    ),
                    calculateNoveltyScore(
                            candidate,
                            profile
                    )
            );
        }

        return diversified.stream()
                .map(scored ->
                        toSongResponse(
                                scored.candidate()
                        )
                )
                .toList();
    }

    private double calculateTasteScore(
            DiscoveryCandidate candidate,
            TasteProfile profile
    ) {

        double spotifyArtistScore =
                getSpotifyArtistScore(candidate, profile);

        double spotifyGenreScore =
                getSpotifyGenreScore(candidate, profile);

        double discoveryArtistScore =
                getDiscoveryArtistScore(candidate, profile);

        double discoveryGenreScore =
                getDiscoveryGenreScore(candidate, profile);

        return
                0.35 * spotifyArtistScore +
                        0.25 * spotifyGenreScore +
                        0.25 * discoveryArtistScore +
                        0.15 * discoveryGenreScore;
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
                candidate.artistGenres() == null ||
                        candidate.artistGenres().isEmpty()
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

        return signal.preference() *
                signal.confidence();
    }

    private double getDiscoveryGenreScore(
            DiscoveryCandidate candidate,
            TasteProfile profile
    ) {

        if (
                candidate.artistGenres() == null ||
                        candidate.artistGenres().isEmpty()
        ) {
            return 0.0;
        }

        return candidate.artistGenres()
                .stream()
                .map(String::toLowerCase)
                .map(profile.discoveryGenreAffinity()::get)
                .filter(Objects::nonNull)
                .mapToDouble(signal ->
                        signal.preference() *
                                signal.confidence()
                )
                .max()
                .orElse(0.0);
    }

    private List<ScoredCandidate> rerankForDiversity(
            List<ScoredCandidate> rankedCandidates
    ) {

        List<ScoredCandidate> result =
                new ArrayList<>();

        Map<String, Integer> artistCounts =
                new HashMap<>();

        Set<String> selectedTrackIds =
                new HashSet<>();

        /*
         * Pass 1:
         * one best track from each artist.
         */
        for (ScoredCandidate scored : rankedCandidates) {

            DiscoveryCandidate candidate =
                    scored.candidate();

            String artistKey =
                    getArtistKey(
                            candidate
                    );

            if (
                    artistCounts.getOrDefault(
                            artistKey,
                            0
                    ) > 0
            ) {
                continue;
            }

            result.add(
                    scored
            );

            selectedTrackIds.add(
                    candidate.trackId()
            );

            artistCounts.put(
                    artistKey,
                    1
            );

            if (
                    result.size() >=
                            MAX_RECOMMENDATIONS
            ) {
                return result;
            }
        }

        /*
         * Pass 2:
         * fill remaining slots, but never
         * exceed the per-artist cap.
         */
        for (ScoredCandidate scored : rankedCandidates) {

            DiscoveryCandidate candidate =
                    scored.candidate();

            if (
                    selectedTrackIds.contains(
                            candidate.trackId()
                    )
            ) {
                continue;
            }

            String artistKey =
                    getArtistKey(
                            candidate
                    );

            int count =
                    artistCounts.getOrDefault(
                            artistKey,
                            0
                    );

            if (
                    count >=
                            MAX_TRACKS_PER_ARTIST
            ) {
                continue;
            }

            result.add(
                    scored
            );

            selectedTrackIds.add(
                    candidate.trackId()
            );

            artistCounts.put(
                    artistKey,
                    count + 1
            );

            if (
                    result.size() >=
                            MAX_RECOMMENDATIONS
            ) {
                break;
            }
        }

        return result;
    }

    private String getArtistKey(
            DiscoveryCandidate candidate
    ) {

        return candidate.artistId() != null
                ? candidate.artistId()
                : candidate.artistName();
    }

    private double calculateNoveltyScore(
            DiscoveryCandidate candidate,
            TasteProfile profile
    ) {

        /*
         * An artist already present in the user's
         * Spotify top artists is highly familiar.
         */
        if (
                candidate.artistId() != null &&
                        profile.spotifyArtistAffinity()
                                .containsKey(candidate.artistId())
        ) {
            return 0.0;
        }

        /*
         * The user has already interacted with this
         * artist inside Spotinder.
         */
        if (
                candidate.artistId() != null &&
                        profile.discoveryArtistAffinity()
                                .containsKey(candidate.artistId())
        ) {
            return 0.25;
        }

        /*
         * Adjacent artists are exactly what
         * Adventure Mode is meant to surface:
         * unfamiliar artist, taste-connected source.
         */
        if (
                candidate.source() ==
                        CandidateSource.ADJACENT_ARTIST
        ) {
            return 1.0;
        }

        /*
         * New artist discovered through a known genre.
         */
        if (
                candidate.source() ==
                        CandidateSource.TOP_GENRE
        ) {
            return 0.75;
        }

        return 0.50;
    }

    private double calculateFinalScore(
            DiscoveryCandidate candidate,
            TasteProfile profile,
            int adventureLevel
    ) {

        double tasteScore =
                calculateTasteScore(
                        candidate,
                        profile
                );

        double noveltyScore =
                calculateNoveltyScore(
                        candidate,
                        profile
                );

        double adventure =
                Math.max(
                        0.0,
                        Math.min(
                                1.0,
                                adventureLevel / 100.0
                        )
                );

        /*
         * Adventure doesn't completely remove taste.
         *
         * 0   -> 90% taste, 10% novelty
         * 50  -> 65% taste, 35% novelty
         * 100 -> 40% taste, 60% novelty
         */
        double noveltyWeight =
                0.10 +
                        (0.50 * adventure);

        double tasteWeight =
                1.0 - noveltyWeight;

        return
                tasteWeight * tasteScore +
                        noveltyWeight * noveltyScore;
    }

    private SongResponse toSongResponse(
            DiscoveryCandidate candidate
    ) {

        return new SongResponse(
                candidate.trackId(),
                candidate.title(),
                candidate.artistName(),
                candidate.albumImage(),
                candidate.previewUrl()
        );
    }
}