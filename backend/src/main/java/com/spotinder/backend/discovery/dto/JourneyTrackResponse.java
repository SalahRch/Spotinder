package com.spotinder.backend.discovery.dto;

public record JourneyTrackResponse(

        String spotifyTrackId,

        String title,

        String artist,

        String albumImage

) {
}