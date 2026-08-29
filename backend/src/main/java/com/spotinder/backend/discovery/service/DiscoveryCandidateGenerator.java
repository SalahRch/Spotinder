package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.model.*;
import com.spotinder.backend.spotify.dto.SpotifyArtist;
import com.spotinder.backend.spotify.dto.SpotifyArtistResponse;
import com.spotinder.backend.spotify.dto.SpotifyTrack;
import com.spotinder.backend.spotify.service.SpotifyService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class DiscoveryCandidateGenerator {

    private static final int ARTISTS_PER_GENRE = 3;

    private static final int ARTIST_SEARCH_PAGE_SIZE = 10;
    private static final int MAX_ARTIST_SEARCH_PAGES = 3;

    private static final int TRACK_RESERVOIR_SIZE = 10;

    private static final int TRACKS_PER_ARTIST = 2;

    private static final int TRACK_SEARCH_PAGE_SIZE = 10;
    private static final int MAX_TRACK_SEARCH_PAGES = 3;

    private final SpotifyService spotifyService;

    /*
     * Spotify sourcing caches.
     *
     * These cache Spotify data only.
     * CandidateOrigin remains request-specific and is rebuilt
     * from the current ExplorationPlan.
     */
    private final Map<String, List<SpotifyArtistResponse>> artistCache =
            new ConcurrentHashMap<>();

    private final Map<String, List<SpotifyTrack>> trackCache =
            new ConcurrentHashMap<>();

    public DiscoveryCandidateGenerator(
            SpotifyService spotifyService
    ) {
        this.spotifyService = spotifyService;
    }

    public List<DiscoveryCandidate> generate(
            ExplorationPlan plan,
            Set<String> excludedTrackIds
    ) {

        Set<String> excluded =
                excludedTrackIds != null
                        ? excludedTrackIds
                        : Set.of();

        if (
                plan == null
                        || plan.genres() == null
                        || plan.genres().isEmpty()
        ) {
            return List.of();
        }

        Map<String, DiscoveryCandidate> candidates =
                new LinkedHashMap<>();

        Set<String> trackIdentityKeys =
                new HashSet<>();


        for (PlannedGenre plannedGenre : plan.genres()) {

            /*
             * Each planned musical neighborhood gets
             * its own artist sourcing opportunity.
             */
            List<SpotifyArtistResponse> artists =
                    findArtistsForGenre(
                            plannedGenre.genre()
                    );


            CandidateOrigin origin =
                    new CandidateOrigin(
                            plannedGenre.genre(),
                            plannedGenre.bucket(),
                            plannedGenre.graphDistance(),
                            plannedGenre.pathStrength(),
                            plannedGenre.path()
                    );


            for (SpotifyArtistResponse artist : artists) {

                List<SpotifyTrack> tracks =


                        findValidTracksForArtist(
                                artist,
                                TRACKS_PER_ARTIST,
                                excluded
                        );


                for (SpotifyTrack track : tracks) {

                    addCandidateIfAbsent(
                            track,
                            artist,
                            origin,
                            candidates,
                            trackIdentityKeys
                    );
                }
            }
        }


        return List.copyOf(
                candidates.values()
        );
    }

    private List<SpotifyTrack> findValidTracksForArtist(
            SpotifyArtistResponse artist,
            int targetTracks,
            Set<String> excludedTrackIds
    ) {

        if (artist == null || artist.id() == null) {
            return List.of();
        }

        List<SpotifyTrack> reservoir =
                trackCache.computeIfAbsent(
                        artist.id(),
                        ignored ->
                                fetchValidTracksForArtist(
                                        artist,
                                        TRACK_RESERVOIR_SIZE
                                )
                );

        return reservoir.stream()
                .filter(track ->
                        !excludedTrackIds.contains(
                                track.id()
                        )
                )
                .limit(targetTracks)
                .toList();
    }

    private List<SpotifyTrack> fetchValidTracksForArtist(
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

            if (validTracks.size() >= targetTracks) {
                break;
            }

            int offset =
                    page * TRACK_SEARCH_PAGE_SIZE;

            List<SpotifyTrack> results =
                    spotifyService.searchTrackCandidates(
                            "artist:" + artist.name(),
                            TRACK_SEARCH_PAGE_SIZE,
                            offset
                    );

            if (results == null || results.isEmpty()) {
                break;
            }

            for (SpotifyTrack track : results) {

                if (
                        track.artists() == null
                                || track.artists().isEmpty()
                ) {
                    continue;
                }

                if (
                        !artist.id().equals(
                                track.artists()
                                        .get(0)
                                        .id()
                        )
                ) {
                    continue;
                }

                validTracks.putIfAbsent(
                        track.id(),
                        track
                );

                if (validTracks.size() >= targetTracks) {
                    break;
                }
            }

            if (results.size() < TRACK_SEARCH_PAGE_SIZE) {
                break;
            }
        }

        return List.copyOf(
                validTracks.values()
        );
    }

    private String trackIdentityKey(
            SpotifyTrack track
    ) {

        if (
                track.artists() == null
                        || track.artists().isEmpty()
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
                        .toLowerCase(Locale.ROOT)
                        .replaceAll(
                                "\\s+",
                                " "
                        );


        return artistId
                + ":"
                + normalizedTitle;
    }

    private List<SpotifyArtistResponse> findArtistsForGenre(
            String genre
    ) {

        String normalizedGenre =
                normalizeGenre(genre);

        if (normalizedGenre.isBlank()) {
            return List.of();
        }

        return artistCache.computeIfAbsent(
                normalizedGenre,
                this::fetchArtistsForGenre
        );
    }

    private List<SpotifyArtistResponse> fetchArtistsForGenre(
            String genre
    ) {

        List<SpotifyArtistResponse> selected =
                new ArrayList<>();

        for (
                int page = 0;
                page < MAX_ARTIST_SEARCH_PAGES;
                page++
        ) {

            int offset =
                    page * ARTIST_SEARCH_PAGE_SIZE;

            List<SpotifyArtistResponse> artists =
                    spotifyService.searchArtists(
                            genre,
                            ARTIST_SEARCH_PAGE_SIZE,
                            offset
                    );

            if (artists == null || artists.isEmpty()) {
                break;
            }

            for (SpotifyArtistResponse artist : artists) {

                if (!artistMatchesGenre(artist, genre)) {
                    continue;
                }

                if (containsArtist(selected, artist.id())) {
                    continue;
                }

                selected.add(artist);

                if (selected.size() >= ARTISTS_PER_GENRE) {
                    return List.copyOf(selected);
                }
            }

            if (artists.size() < ARTIST_SEARCH_PAGE_SIZE) {
                break;
            }
        }

        return List.copyOf(selected);
    }

    private void addCandidateIfAbsent(
            SpotifyTrack track,
            SpotifyArtistResponse sourceArtist,
            CandidateOrigin origin,
            Map<String, DiscoveryCandidate> candidates,
            Set<String> trackIdentityKeys
    ) {

        String identityKey =
                trackIdentityKey(track);


        /*
         * Same song/version identity already entered
         * through another planned neighborhood.
         */
        if (trackIdentityKeys.contains(identityKey)) {
            return;
        }


        /*
         * Same exact Spotify track already entered.
         */
        if (candidates.containsKey(track.id())) {
            return;
        }


        DiscoveryCandidate candidate =

                toCandidate(
                        track,
                        sourceArtist,
                        origin
                );


        candidates.put(
                track.id(),
                candidate
        );

        trackIdentityKeys.add(
                identityKey
        );
    }

    private DiscoveryCandidate toCandidate(
            SpotifyTrack track,
            SpotifyArtistResponse sourceArtist,
            CandidateOrigin origin
    ) {

        SpotifyArtist artist =
                track.artists() != null
                        && !track.artists().isEmpty()
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

                sourceArtist.genres() != null
                        ? sourceArtist.genres()
                        : List.of(),

                track.album() != null
                        && track.album().images() != null
                        && !track.album().images().isEmpty()
                        ? track.album()
                        .images()
                        .get(0)
                        .url()
                        : null,

                track.previewUrl(),
                track.durationMs(),
                track.popularity(),


                origin
        );
    }


    private boolean artistMatchesGenre(
            SpotifyArtistResponse artist,
            String targetGenre
    ) {

        if (
                artist.genres() == null
                        || artist.genres().isEmpty()
        ) {
            return false;
        }

        String normalizedTarget =
                normalizeGenre(targetGenre);

        return artist.genres()
                .stream()
                .map(this::normalizeGenre)
                .anyMatch(normalizedTarget::equals);
    }

    private boolean containsArtist(
            List<SpotifyArtistResponse> artists,
            String artistId
    ) {

        return artists.stream()
                .anyMatch(
                        artist ->
                                artist.id().equals(artistId)
                );
    }

    private String normalizeGenre(
            String genre
    ) {

        if (genre == null) {
            return "";
        }

        return genre
                .trim()
                .toLowerCase(Locale.ROOT)
                .replaceAll("\\s+", " ");
    }
}