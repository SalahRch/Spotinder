package com.spotinder.backend.swipes.service;

import com.spotinder.backend.swipes.dto.SwipeRequest;
import com.spotinder.backend.swipes.dto.SwipeResponse;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import org.springframework.stereotype.Service;

@Service
public class SwipeService {

    private static final String DEMO_USER = "demo-user";

    private final SwipeRepository swipeRepository;

    public SwipeService(SwipeRepository swipeRepository) {
        this.swipeRepository = swipeRepository;
    }

    public SwipeResponse recordSwipe(SwipeRequest request) {

        Swipe swipe = swipeRepository
                .findByUserIdAndSpotifyTrackId(DEMO_USER, request.spotifyTrackId())
                .map(existing -> updateExistingSwipe(existing, request))
                .orElseGet(() -> createSwipe(request));

        swipeRepository.save(swipe);

        return new SwipeResponse(
                swipe.getId(),
                swipe.getSpotifyTrackId(),
                swipe.getDirection(),
                swipe.isBlindMode(),
                "Swipe recorded successfully."
        );
    }

    private Swipe updateExistingSwipe(Swipe swipe, SwipeRequest request) {

        swipe.setDirection(request.direction());
        swipe.setBlindMode(request.blindMode());

        return swipe;
    }

    private Swipe createSwipe(SwipeRequest request) {

        Swipe swipe = new Swipe();

        swipe.setUserId(DEMO_USER);
        swipe.setSpotifyTrackId(request.spotifyTrackId());
        swipe.setDirection(request.direction());
        swipe.setBlindMode(request.blindMode());

        return swipe;
    }
}