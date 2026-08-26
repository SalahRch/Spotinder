package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyArtistsResponse(
        List<SpotifyArtistResponse> artists
) {}