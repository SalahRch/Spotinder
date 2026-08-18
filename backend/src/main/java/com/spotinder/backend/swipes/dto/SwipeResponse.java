package com.spotinder.backend.swipes.dto;

import com.spotinder.backend.achievements.dto.AchievementUnlockResponse;
import com.spotinder.backend.common.enums.SwipeDirection;

import java.util.List;
import java.util.UUID;

public record SwipeResponse(

        UUID id,

        String spotifyTrackId,

        SwipeDirection direction,

        boolean blindMode,

        String message,

        List<AchievementUnlockResponse> unlockedAchievements

) {
}