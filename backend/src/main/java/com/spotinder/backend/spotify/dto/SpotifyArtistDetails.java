package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyArtistDetails(

        String id,

        String name,

        List<String> genres,

        Integer popularity

) {}