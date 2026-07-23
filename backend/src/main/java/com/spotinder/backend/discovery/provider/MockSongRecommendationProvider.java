package com.spotinder.backend.discovery.provider;

import com.spotinder.backend.discovery.dto.SongResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MockSongRecommendationProvider implements SongRecommendationProvider {


    @Override
    public List<SongResponse> getRecommendations() {

        return List.of(
                new SongResponse(
                        "1",
                        "505",
                        "Arctic Monkeys",
                        "https://i.scdn.co/image/..."
                ),
                new SongResponse(
                        "2",
                        "Nights",
                        "Frank Ocean",
                        "https://i.scdn.co/image/..."
                ),
                new SongResponse(
                        "3",
                        "The Less I Know The Better",
                        "Tame Impala",
                        "https://i.scdn.co/image/..."
                )
        );
    }
}
