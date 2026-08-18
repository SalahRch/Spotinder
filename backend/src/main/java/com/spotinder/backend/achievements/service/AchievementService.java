package com.spotinder.backend.achievements.service;

import com.spotinder.backend.achievements.dto.AchievementUnlockResponse;
import com.spotinder.backend.achievements.entity.UserAchievement;
import com.spotinder.backend.common.enums.AchievementType;
import com.spotinder.backend.achievements.repository.UserAchievementRepository;
import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.discovery.entity.DiscoverySession;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AchievementService {

    private final UserAchievementRepository
            userAchievementRepository;

    private final SwipeRepository
            swipeRepository;

    public AchievementService(
            UserAchievementRepository userAchievementRepository,
            SwipeRepository swipeRepository
    ) {
        this.userAchievementRepository =
                userAchievementRepository;

        this.swipeRepository =
                swipeRepository;
    }

    public List<AchievementUnlockResponse> evaluateAfterSwipe(
            Swipe swipe,
            boolean isNewSwipe,
            boolean journeyCompleted
    ) {

        if (!isNewSwipe) {
            return List.of();
        }

        List<AchievementUnlockResponse> unlocked =
                new ArrayList<>();

        String userId =
                swipe.getUserId();

        if (
                swipe.getDirection() ==
                        SwipeDirection.RIGHT &&
                        swipe.isBlindMode()
        ) {
            unlockIfNeeded(
                    userId,
                    AchievementType.BLIND_FAITH,
                    unlocked
            );
        }

        if (
                swipe.getDirection() ==
                        SwipeDirection.RIGHT &&
                        swipe.getAdventureLevel() != null &&
                        swipe.getAdventureLevel() >= 80
        ) {
            unlockIfNeeded(
                    userId,
                    AchievementType.OPEN_MIND,
                    unlocked
            );
        }

        if (
                swipe.getDirection() ==
                        SwipeDirection.RIGHT &&
                        hasHotStreak(userId)
        ) {
            unlockIfNeeded(
                    userId,
                    AchievementType.HOT_STREAK,
                    unlocked
            );
        }

        if (journeyCompleted) {
            unlockIfNeeded(
                    userId,
                    AchievementType.FIRST_JOURNEY,
                    unlocked
            );
        }

        return unlocked;
    }

    private void unlockIfNeeded(
            String userId,
            AchievementType type,
            List<AchievementUnlockResponse> unlocked
    ) {

        boolean alreadyUnlocked =
                userAchievementRepository
                        .existsByUserIdAndAchievementType(
                                userId,
                                type
                        );

        if (alreadyUnlocked) {
            return;
        }

        UserAchievement achievement =
                new UserAchievement();

        achievement.setUserId(
                userId
        );

        achievement.setAchievementType(
                type
        );

        userAchievementRepository.save(
                achievement
        );

        unlocked.add(
                toResponse(type)
        );
    }

    private AchievementUnlockResponse toResponse(
            AchievementType type
    ) {

        return switch (type) {

            case BLIND_FAITH ->
                    new AchievementUnlockResponse(
                            type,
                            "Blind Faith",
                            "You trusted your ears before seeing the name."
                    );

            case OPEN_MIND ->
                    new AchievementUnlockResponse(
                            type,
                            "Open Mind",
                            "You liked something far outside your comfort zone."
                    );

            case HOT_STREAK ->
                    new AchievementUnlockResponse(
                            type,
                            "Hot Streak",
                            "Three discoveries in a row made the cut."
                    );

            case FIRST_JOURNEY ->
                    new AchievementUnlockResponse(
                            type,
                            "First Journey",
                            "You completed your first Daily Discovery."
                    );

            case HIDDEN_GEM ->
                    new AchievementUnlockResponse(
                            type,
                            "Hidden Gem",
                            "You found something off the beaten path."
                    );
        };
    }

    private boolean hasHotStreak(
            String userId
    ) {
        List<Swipe> latestSwipes =
                swipeRepository
                        .findTop3ByUserIdOrderByCreatedAtDesc(
                                userId
                        );

        if (latestSwipes.size() < 3) {
            return false;
        }

        return latestSwipes
                .stream()
                .allMatch(
                        swipe ->
                                swipe.getDirection() ==
                                        SwipeDirection.RIGHT
                );
    }
}