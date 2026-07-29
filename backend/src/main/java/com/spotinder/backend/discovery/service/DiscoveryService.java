package com.spotinder.backend.discovery.service;

import com.spotinder.backend.common.exception.ResourceNotFoundException;
import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.discovery.provider.SongRecommendationProvider;
import com.spotinder.backend.users.entity.User;
import com.spotinder.backend.users.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DiscoveryService {

    private final RecommendationEngine recommendationEngine;
    private final SongRecommendationProvider recommendationProvider;
    private final UserRepository userRepository;

    public DiscoveryService(RecommendationEngine recommendationEngine, SongRecommendationProvider recommendationProvider, UserRepository userRepository) {
        this.recommendationEngine = recommendationEngine;
        this.recommendationProvider = recommendationProvider;
        this.userRepository = userRepository;
    }

    public List<SongResponse> discover(String spotifyId) {

        User user = userRepository.findBySpotifyId(spotifyId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<SongResponse> songs =
                recommendationProvider.getRecommendations();

        return recommendationEngine.generateRecommendations(user, songs);
    }
}
