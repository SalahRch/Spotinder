package com.spotinder.backend.spotify.dto.playlist;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreatePlaylistResponse(

        String id,

        @JsonProperty("external_urls")
        ExternalUrls externalUrls

) {

    public record ExternalUrls(

            String spotify

    ) {}

}