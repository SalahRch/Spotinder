package com.spotinder.backend.spotify.dto;

public record SpotifyTrackResponse(

        String id,
        String title,
        String artist,
        String albumImage

) {}