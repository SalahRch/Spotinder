package com.spotinder.backend.spotify.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record SpotifyTrack(

        String id,
        String name,
        List<SpotifyArtist> artists,
        SpotifyAlbum album,
        @JsonProperty("preview_url")
        String previewUrl

) {}