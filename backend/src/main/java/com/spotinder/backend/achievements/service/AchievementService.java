package com.spotinder.backend.achievements.service;

import com.spotinder.backend.achievements.dto.AchievementResponse;
import com.spotinder.backend.achievements.dto.AchievementUnlockResponse;
import com.spotinder.backend.achievements.entity.UserAchievement;
import com.spotinder.backend.common.enums.AchievementRarity;
import com.spotinder.backend.common.enums.AchievementType;
import com.spotinder.backend.achievements.repository.UserAchievementRepository;
import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AchievementService {

    private record AchievementDefinition(

            String title,

            String description,

            AchievementRarity rarity,

            boolean hidden

    ) {
    }

    private final UserAchievementRepository
            userAchievementRepository;

    private final CurrentUserService currentUserService;

    private final SwipeRepository
            swipeRepository;

    public AchievementService(
            UserAchievementRepository userAchievementRepository, CurrentUserService currentUserService,
            SwipeRepository swipeRepository
    ) {
        this.userAchievementRepository =
                userAchievementRepository;
        this.currentUserService = currentUserService;

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

        AchievementDefinition definition =
                getDefinition(type);

        return new AchievementUnlockResponse(
                type,
                definition.title(),
                definition.description()
        );
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

    private AchievementDefinition getDefinition(
            AchievementType type
    ) {

        return switch (type) {

            case BLIND_FAITH ->
                    new AchievementDefinition(
                            "Blind Faith",
                            "You trusted your ears before seeing the name.",
                            AchievementRarity.DISCOVERY,
                            false
                    );

            case OPEN_MIND ->
                    new AchievementDefinition(
                            "Open Mind",
                            "You liked something far outside your comfort zone.",
                            AchievementRarity.DISCOVERY,
                            false
                    );

            case HOT_STREAK ->
                    new AchievementDefinition(
                            "Hot Streak",
                            "Three discoveries in a row made the cut.",
                            AchievementRarity.RARE,
                            false
                    );

            case FIRST_JOURNEY ->
                    new AchievementDefinition(
                            "First Journey",
                            "You completed your first Daily Discovery.",
                            AchievementRarity.MILESTONE,
                            false
                    );

            case HIDDEN_GEM ->
                    new AchievementDefinition(
                            "Hidden Gem",
                            "You found something off the beaten path.",
                            AchievementRarity.RARE,
                            true
                    );
        };
    }

    public List<AchievementResponse> getAchievements() {

        String userId =
                currentUserService
                        .getCurrentUser()
                        .getSpotifyId();

        Map<AchievementType, UserAchievement> unlockedByType =
                userAchievementRepository
                        .findByUserId(userId)
                        .stream()
                        .collect(
                                Collectors.toMap(
                                        UserAchievement::getAchievementType,
                                        achievement -> achievement
                                )
                        );

        return Arrays.stream(
                        AchievementType.values()
                )
                .map(type -> {

                    AchievementDefinition definition =
                            getDefinition(type);

                    UserAchievement unlockedAchievement =
                            unlockedByType.get(type);

                    boolean unlocked =
                            unlockedAchievement != null;

                    boolean hideDetails =
                            definition.hidden() &&
                                    !unlocked;

                    return new AchievementResponse(
                            type,
                            hideDetails
                                    ? null
                                    : definition.title(),
                            hideDetails
                                    ? null
                                    : definition.description(),
                            definition.rarity(),
                            unlocked,
                            unlocked
                                    ? unlockedAchievement.getUnlockedAt()
                                    : null,
                            definition.hidden()
                    );
                })
                .toList();
    }
}