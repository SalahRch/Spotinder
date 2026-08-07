package com.spotinder.backend.playlists.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PlaylistRequest(
        @NotBlank
        @Size(max = 100)
        String name
) {}
