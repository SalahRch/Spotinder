package com.spotinder.backend.discovery.dto;

import com.spotinder.backend.common.enums.SwipeDirection;

public record JourneyTrackResponse(

        String spotifyTrackId,

        String title,

        String artist,

        String albumImage,

        SwipeDirection direction,

        boolean blindMode,

        Integer adventureLevel

) {
}