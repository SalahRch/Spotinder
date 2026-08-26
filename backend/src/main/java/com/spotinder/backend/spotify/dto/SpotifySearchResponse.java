package com.spotinder.backend.spotify.dto;

public record SpotifySearchResponse(
        SpotifyTrackSearchPage tracks
) {}