package com.spotinder.backend.playlists.dto;

import java.util.List;
import java.util.UUID;

public record PlaylistResponse(

        UUID id,

        String name,

        String spotifyPlaylistId,

        String spotifyUrl,

        List<String> tracks

) {}