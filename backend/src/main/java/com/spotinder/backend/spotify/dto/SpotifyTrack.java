package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyTrack(

        String id,
        String name,
        List<SpotifyArtist> artists,
        SpotifyAlbum album

) {}