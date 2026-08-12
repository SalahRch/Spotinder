package com.spotinder.backend.swipes.dto;

import com.spotinder.backend.common.enums.SwipeDirection;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SwipeRequest(

        @NotBlank
        String spotifyTrackId,

        @NotNull
        SwipeDirection direction,

        boolean blindMode,

        @NotNull
        @Min(0)
        @Max(100)
        Integer adventureLevel
) {
}