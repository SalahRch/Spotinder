package com.spotinder.backend.spotify.client;

import com.spotinder.backend.spotify.dto.SpotifyTrackResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MockSpotifyClient implements SpotifyClient {

    @Override
    public List<SpotifyTrackResponse> getRecommendations() {

        return List.of(

                new SpotifyTrackResponse(
                        "1",
                        "After Hours",
                        "The Weeknd",
                        "https://i.scdn.co/image/..."
                ),

                new SpotifyTrackResponse(
                        "2",
                        "Nights",
                        "Frank Ocean",
                        "https://i.scdn.co/image/..."
                ),

                new SpotifyTrackResponse(
                        "3",
                        "The Less I Know The Better",
                        "Tame Impala",
                        "https://i.scdn.co/image/..."
                )

        );

    }

}