package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RecommendationEngine {

    private static final int MAX_RECOMMENDATIONS = 20;

    private final SwipeRepository swipeRepository;

    public RecommendationEngine(SwipeRepository swipeRepository) {
        this.swipeRepository = swipeRepository;
    }

    public List<SongResponse> generateRecommendations(
            User user,
            List<SongResponse> candidates
    ) {

        Set<String> swipedTracks = swipeRepository
                .findByUserId(user.getSpotifyId())
                .stream()
                .map(swipe -> swipe.getSpotifyTrackId())
                .collect(Collectors.toSet());

        return candidates.stream()
                .filter(song -> !swipedTracks.contains(song.id()))
                .limit(MAX_RECOMMENDATIONS)
                .toList();
    }
}