package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyTrackSearchPage(
        List<SpotifyTrack> items
) {}