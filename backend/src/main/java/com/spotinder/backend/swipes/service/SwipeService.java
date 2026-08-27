package com.spotinder.backend.swipes.service;

import com.spotinder.backend.achievements.dto.AchievementUnlockResponse;
import com.spotinder.backend.achievements.service.AchievementService;
import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.discovery.entity.DiscoverySession;
import com.spotinder.backend.discovery.repository.DiscoverySessionRepository;
import com.spotinder.backend.discovery.service.DailyDiscoveryService;
import com.spotinder.backend.swipes.dto.SwipeRequest;
import com.spotinder.backend.swipes.dto.SwipeResponse;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SwipeService {

    private final DiscoverySessionRepository
            discoverySessionRepository;

    private final CurrentUserService
            currentUserService;

    private final SwipeRepository
            swipeRepository;

    private final DailyDiscoveryService
            dailyDiscoveryService;

    private final AchievementService
            achievementService;


    public SwipeService(
            DiscoverySessionRepository discoverySessionRepository,
            CurrentUserService currentUserService,
            SwipeRepository swipeRepository,
            DailyDiscoveryService dailyDiscoveryService,
            AchievementService achievementService
    ) {

        this.discoverySessionRepository =
                discoverySessionRepository;

        this.currentUserService =
                currentUserService;

        this.swipeRepository =
                swipeRepository;

        this.dailyDiscoveryService =
                dailyDiscoveryService;

        this.achievementService =
                achievementService;
    }


    public SwipeResponse recordSwipe(
            SwipeRequest request
    ) {

        User user =
                currentUserService
                        .getCurrentUser();

        /*
         * Today's session remains available even
         * after the daily journey has been completed.
         *
         * Completion is a milestone, not a hard
         * discovery limit.
         */
        DiscoverySession session =
                getTodaySession(
                        user
                );

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
                                        request
                                )
                        )
                        .orElseGet(() ->
                                createSwipe(
                                        user,
                                        request,
                                        session
                                )
                        );

        swipeRepository.save(
                swipe
        );

        boolean journeyCompleted =
                false;

        /*
         * Only genuinely new swipes count toward
         * daily progress.
         *
         * Changing an old LIKE/PASS should not
         * increment songsSeen again.
         */
        if (isNewSwipe) {

            journeyCompleted =
                    updateDailyProgress(
                            session,
                            request.direction()
                    );
        }

        List<AchievementUnlockResponse>
                unlockedAchievements =
                achievementService
                        .evaluateAfterSwipe(
                                swipe,
                                isNewSwipe,
                                journeyCompleted
                        );

        return new SwipeResponse(
                swipe.getId(),
                swipe.getSpotifyTrackId(),
                swipe.getDirection(),
                swipe.isBlindMode(),
                "Swipe recorded successfully.",
                unlockedAchievements
        );
    }


    /*
     * ---------------------------------------------------------
     * DAILY JOURNEY PROGRESS
     * ---------------------------------------------------------
     */

    private boolean updateDailyProgress(
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

        /*
         * Completion should happen exactly once.
         *
         * Example:
         *
         * swipe 19 -> incomplete
         * swipe 20 -> justCompleted = true
         * swipe 21 -> completed already, keep counting
         */
        boolean justCompleted =
                !session.isCompleted() &&
                        newSongsSeen >=
                                session.getGoal();

        if (justCompleted) {

            session.setCompleted(
                    true
            );

            session.setCompletedAt(
                    Instant.now()
            );

            discoverySessionRepository.save(
                    session
            );

            dailyDiscoveryService.finalizeSession(
                    session
            );

            return true;
        }

        /*
         * Even after completion, songsSeen and
         * songsLiked continue increasing.
         */
        discoverySessionRepository.save(
                session
        );

        return false;
    }


    /*
     * ---------------------------------------------------------
     * TODAY'S DISCOVERY SESSION
     * ---------------------------------------------------------
     */

    private DiscoverySession getTodaySession(
            User user
    ) {

        LocalDate today =
                LocalDate.now();

        Optional<DiscoverySession> existingSession =
                discoverySessionRepository
                        .findByUserIdAndDiscoveryDate(
                                user.getSpotifyId(),
                                today
                        );

        /*
         * IMPORTANT:
         *
         * A completed session is still today's
         * active tracking session.
         *
         * We DO NOT return null after completion.
         */
        if (existingSession.isPresent()) {
            return existingSession.get();
        }

        DiscoverySession session =
                new DiscoverySession();

        session.setUserId(
                user.getSpotifyId()
        );

        session.setDiscoveryDate(
                today
        );

        return discoverySessionRepository
                .save(
                        session
                );
    }


    /*
     * ---------------------------------------------------------
     * EXISTING SWIPE UPDATE
     * ---------------------------------------------------------
     */

    private Swipe updateExistingSwipe(
            Swipe swipe,
            SwipeRequest request
    ) {

        swipe.setDirection(
                request.direction()
        );

        swipe.setBlindMode(
                request.blindMode()
        );

        swipe.setAdventureLevel(
                request.adventureLevel()
        );

        return swipe;
    }


    /*
     * ---------------------------------------------------------
     * NEW SWIPE
     * ---------------------------------------------------------
     */

    private Swipe createSwipe(
            User user,
            SwipeRequest request,
            DiscoverySession session
    ) {

        Swipe swipe =
                new Swipe();

        swipe.setUserId(
                user.getSpotifyId()
        );

        swipe.setSpotifyTrackId(
                request.spotifyTrackId()
        );

        swipe.setDirection(
                request.direction()
        );

        swipe.setBlindMode(
                request.blindMode()
        );

        swipe.setAdventureLevel(
                request.adventureLevel()
        );

        swipe.setDiscoverySession(
                session
        );

        return swipe;
    }
}