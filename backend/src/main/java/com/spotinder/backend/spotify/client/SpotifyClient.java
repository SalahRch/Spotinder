package com.spotinder.backend.spotify.client;

import com.spotinder.backend.spotify.dto.SpotifyTrackResponse;

import java.util.List;

public interface SpotifyClient {

    List<SpotifyTrackResponse> getRecommendations();

}