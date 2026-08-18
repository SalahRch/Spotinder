package com.spotinder.backend.achievements.dto;

import com.spotinder.backend.common.enums.AchievementType;

public record AchievementUnlockResponse(

        AchievementType type,

        String title,

        String description

) {
}