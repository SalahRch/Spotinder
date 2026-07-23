package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.discovery.provider.SongRecommendationProvider;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DiscoveryService {

    private final SongRecommendationProvider recommendationProvider;

    public DiscoveryService(SongRecommendationProvider recommendationProvider) {
        this.recommendationProvider = recommendationProvider;
    }

    public List<SongResponse> discover() {
        return recommendationProvider.getRecommendations();
    }
}
