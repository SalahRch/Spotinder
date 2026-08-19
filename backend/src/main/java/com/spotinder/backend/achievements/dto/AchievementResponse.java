package com.spotinder.backend.achievements.dto;

import com.spotinder.backend.common.enums.AchievementRarity;
import com.spotinder.backend.common.enums.AchievementType;

import java.time.Instant;

public record AchievementResponse(

        AchievementType type,

        String title,

        String description,

        AchievementRarity rarity,

        boolean unlocked,

        Instant unlockedAt,

        boolean hidden

) {
}