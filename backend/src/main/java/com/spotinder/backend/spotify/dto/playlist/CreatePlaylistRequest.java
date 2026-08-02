package com.spotinder.backend.spotify.dto.playlist;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreatePlaylistRequest(

        String name,
        String description,
        @JsonProperty("public")
        boolean isPublic


) {}