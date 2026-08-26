package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyArtistResponse(

        String id,

        String name,

        List<String> genres,

        Integer popularity

) {}