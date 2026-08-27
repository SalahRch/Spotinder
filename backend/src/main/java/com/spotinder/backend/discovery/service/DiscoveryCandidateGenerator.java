package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.model.CandidateSource;
import com.spotinder.backend.discovery.model.DiscoveryCandidate;
import com.spotinder.backend.spotify.dto.SpotifyArtist;
import com.spotinder.backend.spotify.dto.SpotifyArtistResponse;
import com.spotinder.backend.spotify.dto.SpotifyTrack;
import com.spotinder.backend.spotify.service.SpotifyService;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class DiscoveryCandidateGenerator {

    private static final int TARGET_ADJACENT_ARTISTS = 20;

    private static final int ARTIST_SEARCH_PAGE_SIZE = 10;

    private static final int MAX_ARTIST_SEARCH_PAGES = 3;

    private static final int TRACK_SEARCH_PAGE_SIZE = 10;

    private static final int MAX_TRACK_SEARCH_PAGES = 3;

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

        Set<String> trackIdentityKeys =
                new HashSet<>();



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
                candidates,
                trackIdentityKeys
        );

        addAdjacentArtistCandidates(
                adjacentArtists,
                2,
                candidates,
                trackIdentityKeys
        );

        return List.copyOf(
                candidates.values()
        );
    }


    private void addArtistCandidates(
            List<SpotifyArtistResponse> artists,
            int artistCount,
            int tracksPerArtist,
            Map<String, DiscoveryCandidate> candidates,
            Set<String> trackIdentityKeys
    ) {

        artists.stream()
                .limit(artistCount)
                .forEach(artist -> {

                    List<SpotifyTrack> tracks =
                            findValidTracksForArtist(
                                    artist,
                                    tracksPerArtist
                            );

                    tracks.forEach(track ->
                            addCandidateIfAbsent(
                                    track,
                                    CandidateSource.TOP_ARTIST,
                                    artist.genres(),
                                    candidates,
                                    trackIdentityKeys
                            )
                    );
                });
    }

    private String trackIdentityKey(
            SpotifyTrack track
    ) {

        if (
                track.artists() == null ||
                        track.artists().isEmpty()
        ) {
            return track.id();
        }

        String artistId =
                track.artists()
                        .get(0)
                        .id();

        String normalizedTitle =
                track.name()
                        .trim()
                        .toLowerCase()
                        .replaceAll(
                                "\\s+",
                                " "
                        );

        return artistId +
                ":" +
                normalizedTitle;
    }

    private void addCandidateIfAbsent(
            SpotifyTrack track,
            CandidateSource source,
            List<String> artistGenres,
            Map<String, DiscoveryCandidate> candidates,
            Set<String> trackIdentityKeys
    ) {

        String identityKey =
                trackIdentityKey(
                        track
                );

        if (
                trackIdentityKeys.contains(
                        identityKey
                )
        ) {
            return;
        }

        if (
                candidates.containsKey(
                        track.id()
                )
        ) {
            return;
        }

        candidates.put(
                track.id(),
                toCandidate(
                        track,
                        source,
                        artistGenres
                )
        );

        trackIdentityKeys.add(
                identityKey
        );
    }


    private void addAdjacentArtistCandidates(
            List<SpotifyArtistResponse> artists,
            int tracksPerArtist,
            Map<String, DiscoveryCandidate> candidates,
            Set<String> trackIdentityKeys
    ) {

        artists.forEach(artist -> {

            List<SpotifyTrack> tracks =
                    findValidTracksForArtist(
                            artist,
                            tracksPerArtist
                    );

            tracks.forEach(track ->
                    addCandidateIfAbsent(
                            track,
                            CandidateSource.ADJACENT_ARTIST,
                            artist.genres(),
                            candidates,
                            trackIdentityKeys
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

            /*
             * Search several result pages for each
             * taste neighborhood instead of always
             * consuming Spotify's first 10 results.
             */
            for (
                    int page = 0;
                    page < MAX_ARTIST_SEARCH_PAGES;
                    page++
            ) {

                if (
                        adjacentArtists.size() >=
                                TARGET_ADJACENT_ARTISTS
                ) {
                    break;
                }

                int offset =
                        page *
                                ARTIST_SEARCH_PAGE_SIZE;

                List<SpotifyArtistResponse> results =
                        spotifyService.searchArtists(
                                genre,
                                ARTIST_SEARCH_PAGE_SIZE,
                                offset
                        );

                /*
                 * No more Spotify results for
                 * this genre.
                 */
                if (results.isEmpty()) {
                    break;
                }

                results.stream()

                        /*
                         * Valid Spotify artist.
                         */
                        .filter(artist ->
                                artist.id() != null
                        )

                        /*
                         * Don't rediscover one of
                         * the user's existing top
                         * Spotify artists.
                         */
                        .filter(artist ->
                                !knownArtistIds.contains(
                                        artist.id()
                                )
                        )

                        /*
                         * For our current high-
                         * confidence strategy,
                         * genre metadata is required.
                         */
                        .filter(artist ->
                                artist.genres() != null &&
                                        !artist.genres().isEmpty()
                        )

                        /*
                         * Search itself is fuzzy,
                         * so validate that Spotify's
                         * artist metadata actually
                         * contains the seed genre.
                         */
                        .filter(artist ->
                                matchesSeedGenre(
                                        genre,
                                        artist.genres()
                                )
                        )

                        /*
                         * Artist ID deduplicates
                         * artists discovered from
                         * multiple seeds/pages.
                         */
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

                /*
                 * If Spotify returned fewer items
                 * than the requested page size,
                 * this genre has no next full page.
                 */
                if (
                        results.size() <
                                ARTIST_SEARCH_PAGE_SIZE
                ) {
                    break;
                }
            }
        }

        return List.copyOf(
                adjacentArtists.values()
        );
    }

    private List<SpotifyTrack> findValidTracksForArtist(
            SpotifyArtistResponse artist,
            int targetTracks
    ) {

        Map<String, SpotifyTrack> validTracks =
                new LinkedHashMap<>();

        for (
                int page = 0;
                page < MAX_TRACK_SEARCH_PAGES;
                page++
        ) {

            if (
                    validTracks.size() >=
                            targetTracks
            ) {
                break;
            }

            int offset =
                    page *
                            TRACK_SEARCH_PAGE_SIZE;

            List<SpotifyTrack> results =
                    spotifyService.searchTrackCandidates(
                            "artist:" + artist.name(),
                            TRACK_SEARCH_PAGE_SIZE,
                            offset
                    );

            if (results.isEmpty()) {
                break;
            }

            results.stream()

                    /*
                     * Track must actually have
                     * artist metadata.
                     */
                    .filter(track ->
                            track.artists() != null &&
                                    !track.artists().isEmpty()
                    )

                    /*
                     * Spotify Search is fuzzy.
                     *
                     * Only keep tracks where the artist
                     * we're mining is the PRIMARY artist.
                     */
                    .filter(track ->
                            artist.id().equals(
                                    track.artists()
                                            .get(0)
                                            .id()
                            )
                    )

                    /*
                     * Deduplicate by Spotify track ID.
                     */
                    .forEach(track -> {

                        if (
                                validTracks.size() <
                                        targetTracks
                        ) {
                            validTracks.putIfAbsent(
                                    track.id(),
                                    track
                            );
                        }
                    });

            /*
             * No next full page.
             */
            if (
                    results.size() <
                            TRACK_SEARCH_PAGE_SIZE
            ) {
                break;
            }
        }

        return List.copyOf(
                validTracks.values()
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