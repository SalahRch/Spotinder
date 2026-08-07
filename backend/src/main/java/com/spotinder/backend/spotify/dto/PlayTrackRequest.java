package com.spotinder.backend.spotify.dto;

import jakarta.validation.constraints.NotBlank;

public record PlayTrackRequest(

        @NotBlank
        String deviceId,

        @NotBlank
        String spotifyTrackId

) {}