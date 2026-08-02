package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyTopTracksResponse(
        List<SpotifyTrack> items
) {}