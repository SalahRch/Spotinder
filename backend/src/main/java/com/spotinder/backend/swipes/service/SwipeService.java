package com.spotinder.backend.swipes.service;

import com.spotinder.backend.common.exception.ResourceNotFoundException;
import com.spotinder.backend.swipes.dto.SwipeRequest;
import com.spotinder.backend.swipes.dto.SwipeResponse;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import com.spotinder.backend.users.entity.User;
import com.spotinder.backend.users.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class SwipeService {

    private final UserRepository userRepository;
    private final SwipeRepository swipeRepository;

    public SwipeService(UserRepository userRepository, SwipeRepository swipeRepository) {
        this.userRepository = userRepository;
        this.swipeRepository = swipeRepository;
    }

    public SwipeResponse recordSwipe(String spotifyId, SwipeRequest request) {

        User user = userRepository.findBySpotifyId(spotifyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Swipe swipe = swipeRepository
                .findByUserIdAndSpotifyTrackId(user.getSpotifyId(), request.spotifyTrackId())
                .map(existing -> updateExistingSwipe(existing, request))
                .orElseGet(() -> createSwipe(user, request));

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

    private Swipe createSwipe(User user, SwipeRequest request) {

        Swipe swipe = new Swipe();

        swipe.setUserId(user.getSpotifyId());
        swipe.setSpotifyTrackId(request.spotifyTrackId());
        swipe.setDirection(request.direction());
        swipe.setBlindMode(request.blindMode());

        return swipe;
    }
}