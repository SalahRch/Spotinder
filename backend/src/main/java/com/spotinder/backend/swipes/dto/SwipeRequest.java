package com.spotinder.backend.swipes.dto;

import com.spotinder.backend.common.enums.SwipeDirection;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SwipeRequest(

        @NotBlank
        String spotifyTrackId,

        @NotNull
        SwipeDirection direction,

        boolean blindMode

) {
}
