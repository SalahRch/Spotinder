package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.model.AffinitySignal;
import com.spotinder.backend.discovery.model.TasteProfile;
import com.spotinder.backend.spotify.dto.SpotifyArtistResponse;
import com.spotinder.backend.spotify.dto.SpotifyTrackResponse;
import com.spotinder.backend.spotify.service.SpotifyService;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class TasteProfileBuilder {

    private static final double PASS_WEIGHT = 0.35;
    private static final double MIN_ARTIST_AFFINITY = 0.30;


    private double calculateConfidence(
            int interactions
    ) {
        return 1.0 -
                Math.exp(
                        -interactions / 3.0
                );
    }

    private static class SwipeStats {

        private int likes;
        private int passes;

        void like() {
            likes++;
        }

        void pass() {
            passes++;
        }

        int total() {
            return likes + passes;
        }
    }

    private final SpotifyService spotifyService;
    private final SwipeRepository swipeRepository;

    public TasteProfileBuilder(
            SpotifyService spotifyService,
            SwipeRepository swipeRepository
    ) {
        this.spotifyService =
                spotifyService;

        this.swipeRepository =
                swipeRepository;
    }

    public TasteProfile build(
            User user
    ) {

        List<SpotifyArtistResponse> topArtists =
                spotifyService.getTopArtists();

        List<SpotifyTrackResponse> topTracks =
                spotifyService.getTopTracks();

        List<Swipe> swipes =
                swipeRepository.findByUserId(
                        user.getSpotifyId()
                );

        List<String> swipedTrackIds =
                swipes.stream()
                        .map(Swipe::getSpotifyTrackId)
                        .distinct()
                        .toList();

        List<SpotifyTrackResponse> swipedTracks =
                spotifyService.getTracksByIds(
                        swipedTrackIds
                );

        Map<String, SpotifyTrackResponse> swipedTracksById =
                swipedTracks.stream()
                        .collect(
                                Collectors.toMap(
                                        SpotifyTrackResponse::id,
                                        track -> track,
                                        (existing, ignored) ->
                                                existing
                                )
                        );

        Map<String, AffinitySignal> discoveryArtistAffinity =
                buildDiscoveryArtistAffinity(
                        swipes,
                        swipedTracksById
                );

        Map<String, Double> spotifyArtistAffinity =
                buildArtistAffinity(
                        topArtists
                );

        Map<String, Double> spotifyGenreAffinity =
                buildGenreAffinity(
                        topArtists,
                        spotifyArtistAffinity
                );

        Set<String> topArtistIds =
                topArtists.stream()
                        .map(
                                SpotifyArtistResponse::id
                        )
                        .collect(
                                Collectors.toSet()
                        );

        Set<String> topTrackIds =
                topTracks.stream()
                        .map(
                                SpotifyTrackResponse::id
                        )
                        .collect(
                                Collectors.toSet()
                        );

        List<String> discoveryArtistIds =
                swipedTracks.stream()
                        .map(
                                SpotifyTrackResponse::artistId
                        )
                        .filter(
                                artistId ->
                                        artistId != null
                        )
                        .distinct()
                        .toList();

        List<SpotifyArtistResponse> discoveryArtists =
                spotifyService.getArtistsByIds(
                        discoveryArtistIds
                );

        Map<String, SpotifyArtistResponse> discoveryArtistsById =
                discoveryArtists.stream()
                        .collect(
                                Collectors.toMap(
                                        SpotifyArtistResponse::id,
                                        artist -> artist,
                                        (existing, ignored) ->
                                                existing
                                )
                        );

        Map<String, AffinitySignal> discoveryGenreAffinity =
                buildDiscoveryGenreAffinity(
                        discoveryArtistAffinity,
                        discoveryArtistsById
                );

        Set<String> likedTrackIds =
                swipes.stream()
                        .filter(
                                swipe ->
                                        swipe.getDirection()
                                                .name()
                                                .equals("RIGHT")
                        )
                        .map(
                                Swipe::getSpotifyTrackId
                        )
                        .collect(
                                Collectors.toSet()
                        );

        Set<String> passedTrackIds =
                swipes.stream()
                        .filter(
                                swipe ->
                                        swipe.getDirection()
                                                .name()
                                                .equals("LEFT")
                        )
                        .map(
                                Swipe::getSpotifyTrackId
                        )
                        .collect(
                                Collectors.toSet()
                        );

        TasteProfile profile =
                new TasteProfile(
                        topArtistIds,
                        topTrackIds,

                        spotifyArtistAffinity,
                        spotifyGenreAffinity,

                        discoveryArtistAffinity,
                        discoveryGenreAffinity,

                        likedTrackIds,
                        passedTrackIds,

                        swipes.size()
                );


        System.out.println(
                "Spotify artist affinity:"
        );

        profile.spotifyArtistAffinity()
                .forEach((artistId, score) ->
                        System.out.printf(
                                "  %s -> %.2f%n",
                                artistId,
                                score
                        )
                );

        System.out.println(
                "\nSpotinder genre signals:"
        );

        discoveryGenreAffinity.forEach(
                (genre, signal) ->
                        System.out.printf(
                                "  %s -> pref=%.2f, conf=%.2f, artists=%d%n",
                                genre,
                                signal.preference(),
                                signal.confidence(),
                                signal.evidenceCount()
                        )
        );



        System.out.println(
                "Spotify genre affinity:"
        );

        profile.spotifyGenreAffinity()
                .forEach((genre, score) ->
                        System.out.printf(
                                "  %s -> %.2f%n",
                                genre,
                                score
                        )
                );

        return profile;
    }

    private Map<String, Double> buildArtistAffinity(
            List<SpotifyArtistResponse> topArtists
    ) {

        Map<String, Double> affinity =
                new LinkedHashMap<>();

        int size = topArtists.size();

        if (size == 0) {
            return affinity;
        }

        for (int i = 0; i < size; i++) {

            SpotifyArtistResponse artist =
                    topArtists.get(i);

            double position =
                    size == 1
                            ? 0.0
                            : (double) i / (size - 1);

            double score =
                    1.0 -
                            position *
                                    (1.0 - MIN_ARTIST_AFFINITY);

            affinity.put(
                    artist.id(),
                    score
            );
        }

        return affinity;
    }

    private Map<String, Double> buildGenreAffinity(
            List<SpotifyArtistResponse> topArtists,
            Map<String, Double> artistAffinity
    ) {

        Map<String, Double> genreScores =
                new HashMap<>();

        for (SpotifyArtistResponse artist : topArtists) {

            if (
                    artist.genres() == null ||
                            artist.genres().isEmpty()
            ) {
                continue;
            }

            double artistScore =
                    artistAffinity.getOrDefault(
                            artist.id(),
                            0.0
                    );

            for (String genre : artist.genres()) {

                genreScores.merge(
                        genre,
                        artistScore,
                        Double::sum
                );
            }
        }

        /*
         * Normalize strongest genre to 1.0.
         */
        double maxScore =
                genreScores.values()
                        .stream()
                        .mapToDouble(Double::doubleValue)
                        .max()
                        .orElse(1.0);

        Map<String, Double> normalized =
                new LinkedHashMap<>();

        genreScores.entrySet()
                .stream()
                .sorted(
                        Map.Entry
                                .<String, Double>comparingByValue()
                                .reversed()
                )
                .forEach(entry ->
                        normalized.put(
                                entry.getKey(),
                                entry.getValue() / maxScore
                        )
                );

        return normalized;
    }

    private Map<String, AffinitySignal> buildDiscoveryArtistAffinity(
            List<Swipe> swipes,
            Map<String, SpotifyTrackResponse> tracksById
    ) {

        Map<String, SwipeStats> statsByArtist =
                new HashMap<>();

        for (Swipe swipe : swipes) {

            SpotifyTrackResponse track =
                    tracksById.get(
                            swipe.getSpotifyTrackId()
                    );

            if (
                    track == null ||
                            track.artistId() == null
            ) {
                continue;
            }

            SwipeStats stats =
                    statsByArtist.computeIfAbsent(
                            track.artistId(),
                            ignored -> new SwipeStats()
                    );

            if (
                    swipe.getDirection()
                            .name()
                            .equals("RIGHT")
            ) {
                stats.like();
            } else {
                stats.pass();
            }
        }

        Map<String, AffinitySignal> affinity =
                new LinkedHashMap<>();

        statsByArtist.forEach((artistId, stats) -> {

            double preference =
                    (
                            stats.likes -
                                    PASS_WEIGHT * stats.passes
                    )
                            / stats.total();

            double confidence =
                    calculateConfidence(
                            stats.total()
                    );

            affinity.put(
                    artistId,
                    new AffinitySignal(
                            preference,
                            confidence,
                            stats.total()
                    )
            );
        });

        return affinity;
    }

    private Map<String, AffinitySignal> buildDiscoveryGenreAffinity(
            Map<String, AffinitySignal> discoveryArtistAffinity,
            Map<String, SpotifyArtistResponse> discoveryArtistsById
    ) {

        Map<String, Double> weightedPreferenceSum =
                new HashMap<>();

        Map<String, Double> confidenceSum =
                new HashMap<>();

        Map<String, Integer> contributingArtists =
                new HashMap<>();

        /*
         * Each artist contributes once to each
         * genre they belong to.
         */
        discoveryArtistAffinity.forEach(
                (artistId, artistSignal) -> {

                    SpotifyArtistResponse artist =
                            discoveryArtistsById.get(
                                    artistId
                            );

                    if (
                            artist == null ||
                                    artist.genres() == null ||
                                    artist.genres().isEmpty()
                    ) {
                        return;
                    }

                    for (String genre : artist.genres()) {

                        if (
                                genre == null ||
                                        genre.isBlank()
                        ) {
                            continue;
                        }

                        String normalizedGenre =
                                genre
                                        .trim()
                                        .toLowerCase();

                        /*
                         * Confidence-weighted preference.
                         *
                         * A 1-like artist should influence
                         * the genre less than an artist with
                         * 10+ interactions.
                         */
                        double weightedPreference =
                                artistSignal.preference() *
                                        artistSignal.confidence();

                        weightedPreferenceSum.merge(
                                normalizedGenre,
                                weightedPreference,
                                Double::sum
                        );

                        confidenceSum.merge(
                                normalizedGenre,
                                artistSignal.confidence(),
                                Double::sum
                        );

                        contributingArtists.merge(
                                normalizedGenre,
                                1,
                                Integer::sum
                        );
                    }
                }
        );

        Map<String, AffinitySignal> result =
                new LinkedHashMap<>();

        weightedPreferenceSum.forEach(
                (genre, preferenceSum) -> {

                    double totalConfidence =
                            confidenceSum.getOrDefault(
                                    genre,
                                    0.0
                            );

                    if (totalConfidence == 0.0) {
                        return;
                    }

                    /*
                     * Weighted average of artist
                     * preferences for this genre.
                     */
                    double preference =
                            preferenceSum /
                                    totalConfidence;

                    int artistCount =
                            contributingArtists.getOrDefault(
                                    genre,
                                    0
                            );

                    /*
                     * Confidence here represents how
                     * many independent artist signals
                     * support this genre conclusion.
                     *
                     * Using artist count avoids one
                     * heavily repeated artist dominating
                     * the genre signal.
                     */
                    double confidence =
                            calculateConfidence(
                                    artistCount
                            );

                    result.put(
                            genre,
                            new AffinitySignal(
                                    preference,
                                    confidence,
                                    artistCount
                            )
                    );
                }
        );

        return result.entrySet()
                .stream()
                .sorted(
                        Map.Entry
                                .<String, AffinitySignal>
                                        comparingByValue(
                                        Comparator.comparingDouble(
                                                AffinitySignal::preference
                                        )
                                )
                                .reversed()
                )
                .collect(
                        Collectors.toMap(
                                Map.Entry::getKey,
                                Map.Entry::getValue,
                                (existing, ignored) ->
                                        existing,
                                LinkedHashMap::new
                        )
                );
    }

}