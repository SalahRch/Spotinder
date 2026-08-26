package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.model.CandidateSource;
import com.spotinder.backend.discovery.model.DiscoveryCandidate;
import com.spotinder.backend.spotify.dto.SpotifyArtist;
import com.spotinder.backend.spotify.dto.SpotifyArtistResponse;
import com.spotinder.backend.spotify.dto.SpotifyTrack;
import com.spotinder.backend.spotify.service.SpotifyService;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DiscoveryCandidateGenerator {

    private static final int TARGET_ADJACENT_ARTISTS =
            12;

    private static final Set<String> GENERIC_GENRES =
            Set.of(
                    "rap",
                    "house",
                    "pop",
                    "edm",
                    "trap",
                    "hip hop",
                    "electronic"
            );

    private final SpotifyService spotifyService;

    public DiscoveryCandidateGenerator(
            SpotifyService spotifyService
    ) {
        this.spotifyService =
                spotifyService;
    }

    public List<DiscoveryCandidate> generate(
    ) {

        List<SpotifyArtistResponse> topArtists =
                spotifyService.getTopArtists();

        /*
         * Build a ranked genre profile from
         * the user's top Spotify artists.
         */
        List<String> topGenres =
                topArtists.stream()
                        .filter(
                                artist ->
                                        artist.genres() != null
                        )
                        .flatMap(
                                artist ->
                                        artist.genres().stream()
                        )
                        .collect(
                                Collectors.groupingBy(
                                        genre -> genre,
                                        Collectors.counting()
                                )
                        )
                        .entrySet()
                        .stream()
                        .sorted(
                                Map.Entry
                                        .<String, Long>comparingByValue()
                                        .reversed()
                        )
                        .map(
                                Map.Entry::getKey
                        )
                        .toList();

        /*
         * Broad genres such as "rap" and "house"
         * are too noisy as direct artist-search seeds.
         */
        List<String> discoveryGenres =
                topGenres.stream()
                        .filter(
                                genre ->
                                        !GENERIC_GENRES.contains(
                                                genre
                                                        .trim()
                                                        .toLowerCase()
                                        )
                        )
                        .toList();

        /*
         * Discover unfamiliar artists around
         * the user's specific taste neighborhoods.
         */
        List<SpotifyArtistResponse> adjacentArtists =
                findAdjacentArtists(
                        topArtists,
                        discoveryGenres
                );

        System.out.println(
                "Adjacent artists:"
        );

        adjacentArtists.forEach(
                artist ->
                        System.out.println(
                                "- " +
                                        artist.name() +
                                        " " +
                                        artist.genres()
                        )
        );

        Map<String, DiscoveryCandidate> candidates =
                new LinkedHashMap<>();

        /*
         * Candidate generation creates the same
         * broad taste-relevant universe regardless
         * of Adventure Mode.
         *
         * RecommendationEngine decides how much
         * familiar vs novel music should rank.
         */

        /*
         * Familiar anchors.
         */
        addArtistCandidates(
                topArtists,
                5,
                2,
                candidates
        );

        /*
         * Novel but taste-connected artists.
         */
        addAdjacentArtistCandidates(
                adjacentArtists,
                2,
                candidates
        );

        return List.copyOf(
                candidates.values()
        );
    }

    private void addArtistCandidates(
            List<SpotifyArtistResponse> artists,
            int artistCount,
            int tracksPerArtist,
            Map<String, DiscoveryCandidate> candidates
    ) {

        artists.stream()
                .limit(artistCount)
                .forEach(artist -> {

                    List<SpotifyTrack> tracks =
                            spotifyService.searchTrackCandidates(
                                    "artist:" + artist.name(),
                                    tracksPerArtist
                            );

                    tracks.stream()

                            .filter(track ->
                                    track.artists() != null &&
                                            !track.artists().isEmpty()
                            )

                            .filter(track ->
                                    artist.id().equals(
                                            track.artists()
                                                    .get(0)
                                                    .id()
                                    )
                            )

                            .forEach(track ->
                                    candidates.putIfAbsent(
                                            track.id(),
                                            toCandidate(
                                                    track,
                                                    CandidateSource.TOP_ARTIST,
                                                    artist.genres()
                                            )
                                    )
                            );
                });
    }


    private void addAdjacentArtistCandidates(
            List<SpotifyArtistResponse> artists,
            int tracksPerArtist,
            Map<String, DiscoveryCandidate> candidates
    ) {

        artists.forEach(artist -> {

            List<SpotifyTrack> tracks =
                    spotifyService.searchTrackCandidates(
                            "artist:" + artist.name(),
                            tracksPerArtist
                    );

            tracks.stream()

                    /*
                     * Spotify Search is fuzzy.
                     *
                     * Only accept tracks whose
                     * primary artist is actually
                     * the artist we searched for.
                     */
                    .filter(track ->
                            track.artists() != null &&
                                    !track.artists().isEmpty()
                    )

                    .filter(track ->
                            artist.id().equals(
                                    track.artists()
                                            .get(0)
                                            .id()
                            )
                    )

                    .forEach(track ->
                            candidates.putIfAbsent(
                                    track.id(),
                                    toCandidate(
                                            track,
                                            CandidateSource.ADJACENT_ARTIST,
                                            artist.genres()
                                    )
                            )
                    );
        });
    }


    private DiscoveryCandidate toCandidate(
            SpotifyTrack track,
            CandidateSource source,
            List<String> artistGenres
    ) {

        SpotifyArtist artist =
                track.artists() != null &&
                        !track.artists().isEmpty()
                        ? track.artists().get(0)
                        : null;

        return new DiscoveryCandidate(
                track.id(),
                track.name(),

                artist != null
                        ? artist.id()
                        : null,

                artist != null
                        ? artist.name()
                        : "Unknown Artist",

                artistGenres != null
                        ? artistGenres
                        : List.of(),

                track.album() != null &&
                        track.album().images() != null &&
                        !track.album().images().isEmpty()
                        ? track.album()
                        .images()
                        .get(0)
                        .url()
                        : null,

                track.previewUrl(),
                track.durationMs(),
                track.popularity(),
                source
        );
    }


    private List<SpotifyArtistResponse> findAdjacentArtists(
            List<SpotifyArtistResponse> topArtists,
            List<String> discoveryGenres
    ) {

        Set<String> knownArtistIds =
                topArtists.stream()
                        .map(
                                SpotifyArtistResponse::id
                        )
                        .collect(
                                Collectors.toSet()
                        );

        Map<String, SpotifyArtistResponse> adjacentArtists =
                new LinkedHashMap<>();

        for (String genre : discoveryGenres) {

            if (
                    adjacentArtists.size() >=
                            TARGET_ADJACENT_ARTISTS
            ) {
                break;
            }

            List<SpotifyArtistResponse> results =
                    spotifyService.searchArtists(
                            genre,
                            10
                    );

            results.stream()

                    .filter(artist ->
                            artist.id() != null
                    )

                    .filter(artist ->
                            !knownArtistIds.contains(
                                    artist.id()
                            )
                    )

                    .filter(artist ->
                            artist.genres() != null &&
                                    !artist.genres().isEmpty()
                    )

                    .filter(artist ->
                            matchesSeedGenre(
                                    genre,
                                    artist.genres()
                            )
                    )

                    .forEach(artist -> {

                        if (
                                adjacentArtists.size() <
                                        TARGET_ADJACENT_ARTISTS
                        ) {
                            adjacentArtists.putIfAbsent(
                                    artist.id(),
                                    artist
                            );
                        }
                    });
        }

        return List.copyOf(
                adjacentArtists.values()
        );
    }

    private boolean matchesSeedGenre(
            String seedGenre,
            List<String> artistGenres
    ) {

        if (
                seedGenre == null ||
                        artistGenres == null ||
                        artistGenres.isEmpty()
        ) {
            return false;
        }

        String normalizedSeed =
                seedGenre
                        .trim()
                        .toLowerCase();

        return artistGenres.stream()
                .filter(
                        genre ->
                                genre != null
                )
                .map(
                        genre ->
                                genre
                                        .trim()
                                        .toLowerCase()
                )
                .anyMatch(
                        normalizedSeed::equals
                );
    }
}