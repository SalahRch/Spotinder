package com.spotinder.backend.spotify.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SpotifyUserProfile(

        String id,

        @JsonProperty("display_name")
        String displayName,

        String email

) {}