package com.spotinder.backend.insights.service;

import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.common.exception.ResourceNotFoundException;
import com.spotinder.backend.insights.dto.InsightsResponse;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import com.spotinder.backend.users.entity.User;
import com.spotinder.backend.users.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class InsightsService {

    private final UserRepository userRepository;
    private final SwipeRepository swipeRepository;

    public InsightsService(
            UserRepository userRepository,
            SwipeRepository swipeRepository
    ) {
        this.userRepository = userRepository;
        this.swipeRepository = swipeRepository;
    }

    public InsightsResponse getInsights(String spotifyId) {

        User user = userRepository
                .findBySpotifyId(spotifyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        long songsLiked = swipeRepository.countByUserIdAndDirection(
                user.getSpotifyId(),
                SwipeDirection.RIGHT
        );

        long songsPassed = swipeRepository.countByUserIdAndDirection(
                user.getSpotifyId(),
                SwipeDirection.LEFT
        );

        long totalSwipes = swipeRepository.countByUserId(
                user.getSpotifyId()
        );

        double likeRatio =
                totalSwipes == 0
                        ? 0
                        : (double) songsLiked / totalSwipes;

        int discoveryScore =
                totalSwipes == 0
                        ? 0
                        : (int) Math.round(likeRatio * 100);

        return new InsightsResponse(
                songsLiked,
                songsPassed,
                likeRatio,
                discoveryScore
        );
    }
}