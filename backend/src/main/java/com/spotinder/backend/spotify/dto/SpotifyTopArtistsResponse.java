package com.spotinder.backend.spotify.dto;

import java.util.List;

public record SpotifyTopArtistsResponse(

        List<SpotifyArtistDetails> items

) {}