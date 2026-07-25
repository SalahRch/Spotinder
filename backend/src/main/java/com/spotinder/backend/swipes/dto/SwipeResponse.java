package com.spotinder.backend.swipes.dto;

import com.spotinder.backend.common.enums.SwipeDirection;

import java.util.UUID;

public record SwipeResponse(

        UUID id,

        String spotifyTrackId,

        SwipeDirection direction,

        boolean blindMode,

        String message

) {
}
