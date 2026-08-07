package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyTracksResponse(
        List<SpotifyTrack> tracks
) {}