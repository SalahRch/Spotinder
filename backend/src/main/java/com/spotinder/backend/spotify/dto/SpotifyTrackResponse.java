package com.spotinder.backend.spotify.dto;

public record SpotifyTrackResponse(

        String id,
        String title,
        String artistId,
        String artist,
        String albumImage,
        String previewUrl

) {}