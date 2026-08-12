package com.spotinder.backend.users.dto;

import com.spotinder.backend.common.enums.SpotifyProduct;

import java.time.Instant;

public record UserResponse(

        String spotifyId,
        String displayName,
        String email,
        String avatarUrl,
        String country,
        SpotifyProduct product,
        Integer adventureLevel,
        boolean blindModeDefault,
        Instant createdAt

) {}