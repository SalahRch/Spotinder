package com.spotinder.backend.users.dto;

import com.spotinder.backend.common.enums.SpotifyProduct;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRequest(
        @NotBlank
        String spotifyId,
        @NotBlank
        String displayName,
        String email,
        String avatarUrl,
        @NotBlank
        String country,
        SpotifyProduct product
) {}
