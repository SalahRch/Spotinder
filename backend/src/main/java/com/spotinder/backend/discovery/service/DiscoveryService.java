package com.spotinder.backend.discovery.service;

import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.discovery.model.DiscoveryCandidate;
import com.spotinder.backend.discovery.model.TasteProfile;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscoveryService {

    private final RecommendationEngine recommendationEngine;
    private final CurrentUserService currentUserService;
    private final DiscoveryCandidateGenerator candidateGenerator;
    private final TasteProfileBuilder tasteProfileBuilder;


    public DiscoveryService(
            RecommendationEngine recommendationEngine,
            CurrentUserService currentUserService,
            DiscoveryCandidateGenerator candidateGenerator, TasteProfileBuilder tasteProfileBuilder
    ) {
        this.recommendationEngine =
                recommendationEngine;

        this.currentUserService =
                currentUserService;

        this.candidateGenerator =
                candidateGenerator;
        this.tasteProfileBuilder = tasteProfileBuilder;
    }

    public List<SongResponse> discover() {

        User user =
                currentUserService.getCurrentUser();

        TasteProfile tasteProfile =
                tasteProfileBuilder.build(user);

        List<DiscoveryCandidate> candidates =
                candidateGenerator.generate();

        int adventureLevel =
                user.getAdventureLevel() != null
                        ? user.getAdventureLevel()
                        : 50;

        return recommendationEngine.generateRecommendations(
                candidates,
                tasteProfile,
                adventureLevel
        );

    }
}