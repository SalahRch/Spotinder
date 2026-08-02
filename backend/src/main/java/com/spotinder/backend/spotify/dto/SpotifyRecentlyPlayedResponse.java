package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyRecentlyPlayedResponse(

        List<SpotifyRecentlyPlayedItem> items

) {}