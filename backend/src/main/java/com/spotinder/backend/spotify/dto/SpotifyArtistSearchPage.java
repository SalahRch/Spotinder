package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyArtistSearchPage(
        List<SpotifyArtistDetails> items
) {}