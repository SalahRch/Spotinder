package com.spotinder.backend.swipes.service;

import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.common.exception.ResourceNotFoundException;
import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.discovery.entity.DiscoverySession;
import com.spotinder.backend.discovery.repository.DiscoverySessionRepository;
import com.spotinder.backend.swipes.dto.SwipeRequest;
import com.spotinder.backend.swipes.dto.SwipeResponse;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import com.spotinder.backend.users.entity.User;
import com.spotinder.backend.users.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class SwipeService {


    private final DiscoverySessionRepository
            discoverySessionRepository;
    private final CurrentUserService currentUserService;
    private final SwipeRepository swipeRepository;

    public SwipeService(DiscoverySessionRepository discoverySessionRepository, CurrentUserService currentUserService, SwipeRepository swipeRepository) {
        this.discoverySessionRepository = discoverySessionRepository;
        this.currentUserService = currentUserService;
        this.swipeRepository = swipeRepository;
    }

    public SwipeResponse recordSwipe(SwipeRequest request) {

        User user =
                currentUserService.getCurrentUser();

        DiscoverySession session =
                getOrCreateTodaySession(user);

        Optional<Swipe> existingSwipe =
                swipeRepository
                        .findByUserIdAndSpotifyTrackId(
                                user.getSpotifyId(),
                                request.spotifyTrackId()
                        );

        boolean isNewSwipe =
                existingSwipe.isEmpty();

        Swipe swipe =
                existingSwipe
                        .map(existing ->
                                updateExistingSwipe(
                                        existing,
                                        request,
                                        session
                                )
                        )
                        .orElseGet(() ->
                                createSwipe(
                                        user,
                                        request,
                                        session
                                )
                        );

        swipeRepository.save(swipe);

        if (
                isNewSwipe &&
                        !session.isCompleted()
        ) {
            updateDailyProgress(
                    session,
                    request.direction()
            );
        }

        return new SwipeResponse(
                swipe.getId(),
                swipe.getSpotifyTrackId(),
                swipe.getDirection(),
                swipe.isBlindMode(),
                "Swipe recorded successfully."
        );
    }

    private void updateDailyProgress(
            DiscoverySession session,
            SwipeDirection direction
    ) {

        int newSongsSeen =
                session.getSongsSeen() + 1;

        session.setSongsSeen(
                newSongsSeen
        );

        if (
                direction ==
                        SwipeDirection.RIGHT
        ) {
            session.setSongsLiked(
                    session.getSongsLiked() + 1
            );
        }

        if (
                newSongsSeen >=
                        session.getGoal()
        ) {
            session.setCompleted(true);
            session.setCompletedAt(
                    Instant.now()
            );
        }

        discoverySessionRepository.save(
                session
        );
    }

    private DiscoverySession getOrCreateTodaySession(
            User user
    ) {

        LocalDate today =
                LocalDate.now();

        return discoverySessionRepository
                .findByUserIdAndDiscoveryDate(
                        user.getSpotifyId(),
                        today
                )
                .orElseGet(() -> {

                    DiscoverySession session =
                            new DiscoverySession();

                    session.setUserId(
                            user.getSpotifyId()
                    );

                    session.setDiscoveryDate(
                            today
                    );

                    return discoverySessionRepository
                            .save(session);
                });
    }

    private Swipe updateExistingSwipe(Swipe swipe, SwipeRequest request, DiscoverySession session) {

        swipe.setDirection(request.direction());
        swipe.setBlindMode(request.blindMode());
        swipe.setAdventureLevel(
                request.adventureLevel()
        );

        swipe.setDiscoverySession(
                session
        );

        return swipe;
    }

    private Swipe createSwipe(User user, SwipeRequest request, DiscoverySession session) {

        Swipe swipe = new Swipe();

        swipe.setUserId(user.getSpotifyId());
        swipe.setSpotifyTrackId(request.spotifyTrackId());
        swipe.setDirection(request.direction());
        swipe.setBlindMode(request.blindMode());
        swipe.setAdventureLevel(
                request.adventureLevel()
        );
        swipe.setDiscoverySession(
                session
        );

        return swipe;
    }
}