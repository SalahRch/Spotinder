package com.spotinder.backend.spotify.service;

import com.spotinder.backend.spotify.client.SpotifyClient;
import com.spotinder.backend.spotify.dto.*;
import com.spotinder.backend.spotify.dto.playlist.AddTracksRequest;
import com.spotinder.backend.spotify.dto.playlist.CreatePlaylistRequest;
import com.spotinder.backend.spotify.dto.playlist.CreatePlaylistResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SpotifyService {

    private final SpotifyTokenService spotifyTokenService;
    private final SpotifyClient spotifyClient;
    private final RestClient restClient;

    public SpotifyService(
            SpotifyTokenService spotifyTokenService,
            SpotifyClient spotifyClient
    ) {
        this.spotifyTokenService =
                spotifyTokenService;

        this.spotifyClient =
                spotifyClient;

        this.restClient =
                RestClient.create();
    }


    /*
     * =========================================================
     * LEGACY RECOMMENDATIONS
     * =========================================================
     */

    public List<SpotifyTrackResponse> getRecommendations() {

        return spotifyClient.getRecommendations();
    }


    /*
     * =========================================================
     * USER TOP TRACKS
     * =========================================================
     */

    public List<SpotifyTrackResponse> getTopTracks() {

        String accessToken =
                spotifyTokenService.getAccessToken();

        SpotifyTopTracksResponse response =
                restClient.get()
                        .uri(
                                "https://api.spotify.com/v1/me/top/tracks"
                        )
                        .header(
                                "Authorization",
                                "Bearer " + accessToken
                        )
                        .retrieve()
                        .body(
                                SpotifyTopTracksResponse.class
                        );

        if (
                response == null ||
                        response.items() == null
        ) {
            return List.of();
        }

        return response.items()
                .stream()
                .map(this::toTrackResponse)
                .toList();
    }


    /*
     * =========================================================
     * RECENTLY PLAYED
     * =========================================================
     */

    public List<SpotifyTrackResponse> getRecentlyPlayed() {

        String accessToken =
                spotifyTokenService.getAccessToken();

        SpotifyRecentlyPlayedResponse response =
                restClient.get()
                        .uri(
                                "https://api.spotify.com/v1/me/player/recently-played"
                        )
                        .header(
                                "Authorization",
                                "Bearer " + accessToken
                        )
                        .retrieve()
                        .body(
                                SpotifyRecentlyPlayedResponse.class
                        );

        if (
                response == null ||
                        response.items() == null
        ) {
            return List.of();
        }

        return response.items()
                .stream()
                .map(item ->
                        toTrackResponse(
                                item.track()
                        )
                )
                .toList();
    }


    /*
     * =========================================================
     * CURRENT SPOTIFY USER
     * =========================================================
     */

    public String getCurrentUserId() {

        String accessToken =
                spotifyTokenService.getAccessToken();

        SpotifyUserProfile user =
                restClient.get()
                        .uri(
                                "https://api.spotify.com/v1/me"
                        )
                        .header(
                                "Authorization",
                                "Bearer " + accessToken
                        )
                        .retrieve()
                        .body(
                                SpotifyUserProfile.class
                        );

        if (user == null) {
            throw new RuntimeException(
                    "Unable to retrieve Spotify profile."
            );
        }

        return user.id();
    }


    /*
     * =========================================================
     * PLAYLIST CREATION
     * =========================================================
     */

    public CreatePlaylistResponse createPlaylist(
            String userId,
            String name
    ) {

        String accessToken =
                spotifyTokenService.getAccessToken();

        CreatePlaylistRequest request =
                new CreatePlaylistRequest(
                        name,
                        "Generated by Spotinder",
                        false
                );

        CreatePlaylistResponse response =
                restClient.post()
                        .uri(
                                "https://api.spotify.com/v1/users/{userId}/playlists",
                                userId
                        )
                        .header(
                                "Authorization",
                                "Bearer " + accessToken
                        )
                        .body(request)
                        .retrieve()
                        .body(
                                CreatePlaylistResponse.class
                        );

        if (response == null) {
            throw new RuntimeException(
                    "Failed to create playlist."
            );
        }

        return response;
    }


    public void addTracksToPlaylist(
            String playlistId,
            List<String> trackIds
    ) {

        String accessToken =
                spotifyTokenService.getAccessToken();

        List<String> uris =
                trackIds.stream()
                        .map(id ->
                                "spotify:track:" + id
                        )
                        .toList();

        AddTracksRequest request =
                new AddTracksRequest(
                        uris
                );

        restClient.post()
                .uri(
                        "https://api.spotify.com/v1/playlists/{playlistId}/tracks",
                        playlistId
                )
                .header(
                        "Authorization",
                        "Bearer " + accessToken
                )
                .body(request)
                .retrieve()
                .toBodilessEntity();
    }


    /*
     * =========================================================
     * PLAYBACK
     * =========================================================
     */

    public void playTrack(
            String deviceId,
            String spotifyTrackId
    ) {

        String accessToken =
                spotifyTokenService.getAccessToken();

        Map<String, Object> body =
                Map.of(
                        "uris",
                        List.of(
                                "spotify:track:" +
                                        spotifyTrackId
                        )
                );

        restClient.put()
                .uri(
                        "https://api.spotify.com/v1/me/player/play?device_id={deviceId}",
                        deviceId
                )
                .header(
                        "Authorization",
                        "Bearer " + accessToken
                )
                .body(body)
                .retrieve()
                .toBodilessEntity();
    }


    private static final int SPOTIFY_TRACK_BATCH_SIZE = 50;

    /*
     * =========================================================
     * TRACK LOOKUP BY IDS
     * =========================================================
     */

    public List<SpotifyTrackResponse> getTracksByIds(
            List<String> trackIds
    ) {

        if (
                trackIds == null ||
                        trackIds.isEmpty()
        ) {
            return List.of();
        }

        String accessToken =
                spotifyTokenService.getAccessToken();

        List<SpotifyTrackResponse> tracks =
                new ArrayList<>();

        for (
                int start = 0;
                start < trackIds.size();
                start += SPOTIFY_TRACK_BATCH_SIZE
        ) {

            int end =
                    Math.min(
                            start + SPOTIFY_TRACK_BATCH_SIZE,
                            trackIds.size()
                    );

            List<String> batch =
                    trackIds.subList(
                            start,
                            end
                    );

            String ids =
                    String.join(
                            ",",
                            batch
                    );

            SpotifyTracksResponse response =
                    restClient.get()
                            .uri(
                                    "https://api.spotify.com/v1/tracks?ids={ids}",
                                    ids
                            )
                            .header(
                                    "Authorization",
                                    "Bearer " + accessToken
                            )
                            .retrieve()
                            .body(
                                    SpotifyTracksResponse.class
                            );

            if (
                    response == null ||
                            response.tracks() == null
            ) {
                continue;
            }

            response.tracks()
                    .stream()
                    .filter(track ->
                            track != null
                    )
                    .map(this::toTrackResponse)
                    .forEach(
                            tracks::add
                    );
        }

        return List.copyOf(tracks);
    }


    /*
     * =========================================================
     * USER TOP ARTISTS
     * =========================================================
     */

    public List<SpotifyArtistResponse> getTopArtists() {

        String accessToken =
                spotifyTokenService.getAccessToken();

        SpotifyTopArtistsResponse response =
                restClient.get()
                        .uri(
                                "https://api.spotify.com/v1/me/top/artists?limit=20"
                        )
                        .header(
                                "Authorization",
                                "Bearer " + accessToken
                        )
                        .retrieve()
                        .body(
                                SpotifyTopArtistsResponse.class
                        );

        if (
                response == null ||
                        response.items() == null
        ) {
            return List.of();
        }

        return response.items()
                .stream()
                .map(artist ->
                        new SpotifyArtistResponse(
                                artist.id(),
                                artist.name(),
                                artist.genres(),
                                artist.popularity()
                        )
                )
                .toList();
    }


    /*
     * =========================================================
     * TRACK SEARCH
     * =========================================================
     */

    public List<SpotifyTrack> searchTrackCandidates(
            String query,
            int limit
    ) {

        return searchTrackCandidates(
                query,
                limit,
                0
        );
    }


    public List<SpotifyTrack> searchTrackCandidates(
            String query,
            int limit,
            int offset
    ) {

        String accessToken =
                spotifyTokenService.getAccessToken();

        SpotifySearchResponse response =
                restClient.get()
                        .uri(uriBuilder ->
                                uriBuilder
                                        .scheme("https")
                                        .host(
                                                "api.spotify.com"
                                        )
                                        .path(
                                                "/v1/search"
                                        )
                                        .queryParam(
                                                "q",
                                                query
                                        )
                                        .queryParam(
                                                "type",
                                                "track"
                                        )
                                        .queryParam(
                                                "limit",
                                                limit
                                        )
                                        .queryParam(
                                                "offset",
                                                offset
                                        )
                                        .build()
                        )
                        .header(
                                "Authorization",
                                "Bearer " + accessToken
                        )
                        .retrieve()
                        .body(
                                SpotifySearchResponse.class
                        );

        if (
                response == null ||
                        response.tracks() == null ||
                        response.tracks().items() == null
        ) {
            return List.of();
        }

        return response.tracks()
                .items();
    }


    /*
     * =========================================================
     * ARTIST LOOKUP BY IDS
     * =========================================================
     */

    private static final int SPOTIFY_ARTIST_BATCH_SIZE = 50;

    public List<SpotifyArtistResponse> getArtistsByIds(
            List<String> artistIds
    ) {

        if (
                artistIds == null ||
                        artistIds.isEmpty()
        ) {
            return List.of();
        }

        String accessToken =
                spotifyTokenService.getAccessToken();

        List<SpotifyArtistResponse> artists =
                new ArrayList<>();

        for (
                int start = 0;
                start < artistIds.size();
                start += SPOTIFY_ARTIST_BATCH_SIZE
        ) {

            int end =
                    Math.min(
                            start + SPOTIFY_ARTIST_BATCH_SIZE,
                            artistIds.size()
                    );

            List<String> batch =
                    artistIds.subList(
                            start,
                            end
                    );

            String ids =
                    String.join(
                            ",",
                            batch
                    );

            SpotifyArtistsResponse response =
                    restClient.get()
                            .uri(
                                    "https://api.spotify.com/v1/artists?ids={ids}",
                                    ids
                            )
                            .header(
                                    "Authorization",
                                    "Bearer " + accessToken
                            )
                            .retrieve()
                            .body(
                                    SpotifyArtistsResponse.class
                            );

            if (
                    response == null ||
                            response.artists() == null
            ) {
                continue;
            }

            response.artists()
                    .stream()
                    .filter(artist ->
                            artist != null
                    )
                    .forEach(
                            artists::add
                    );
        }

        return List.copyOf(artists);
    }

    /*
     * =========================================================
     * LIGHTWEIGHT TRACK SEARCH
     * =========================================================
     */

    public List<SpotifyTrackResponse> searchTracks(
            String query,
            int limit
    ) {

        return searchTracks(
                query,
                limit,
                0
        );
    }


    public List<SpotifyTrackResponse> searchTracks(
            String query,
            int limit,
            int offset
    ) {

        return searchTrackCandidates(
                query,
                limit,
                offset
        )
                .stream()
                .map(this::toTrackResponse)
                .toList();
    }


    /*
     * =========================================================
     * ARTIST SEARCH
     * =========================================================
     */

    public List<SpotifyArtistResponse> searchArtists(
            String query,
            int limit
    ) {

        return searchArtists(
                query,
                limit,
                0
        );
    }


    public List<SpotifyArtistResponse> searchArtists(
            String query,
            int limit,
            int offset
    ) {

        String accessToken =
                spotifyTokenService.getAccessToken();

        SpotifyArtistSearchResponse response =
                restClient.get()
                        .uri(uriBuilder ->
                                uriBuilder
                                        .scheme("https")
                                        .host(
                                                "api.spotify.com"
                                        )
                                        .path(
                                                "/v1/search"
                                        )
                                        .queryParam(
                                                "q",
                                                query
                                        )
                                        .queryParam(
                                                "type",
                                                "artist"
                                        )
                                        .queryParam(
                                                "limit",
                                                limit
                                        )
                                        .queryParam(
                                                "offset",
                                                offset
                                        )
                                        .build()
                        )
                        .header(
                                "Authorization",
                                "Bearer " + accessToken
                        )
                        .retrieve()
                        .body(
                                SpotifyArtistSearchResponse.class
                        );

        if (
                response == null ||
                        response.artists() == null ||
                        response.artists().items() == null
        ) {
            return List.of();
        }

        return response.artists()
                .items()
                .stream()
                .map(artist ->
                        new SpotifyArtistResponse(
                                artist.id(),
                                artist.name(),
                                artist.genres(),
                                artist.popularity()
                        )
                )
                .toList();
    }


    /*
     * =========================================================
     * SHARED TRACK MAPPER
     * =========================================================
     */

    private SpotifyTrackResponse toTrackResponse(
            SpotifyTrack track
    ) {

        String artistId =
                track.artists() == null ||
                        track.artists().isEmpty()
                        ? null
                        : track.artists()
                        .get(0)
                        .id();

        String artistName =
                track.artists() == null ||
                        track.artists().isEmpty()
                        ? "Unknown Artist"
                        : track.artists()
                        .get(0)
                        .name();

        String albumImage =
                track.album() == null ||
                        track.album().images() == null ||
                        track.album()
                                .images()
                                .isEmpty()
                        ? null
                        : track.album()
                        .images()
                        .get(0)
                        .url();

        return new SpotifyTrackResponse(
                track.id(),
                track.name(),
                artistId,
                artistName,
                albumImage,
                track.previewUrl()
        );
    }
}