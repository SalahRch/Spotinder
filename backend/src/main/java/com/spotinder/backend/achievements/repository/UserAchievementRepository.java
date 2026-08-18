package com.spotinder.backend.achievements.repository;

import com.spotinder.backend.achievements.entity.UserAchievement;
import com.spotinder.backend.common.enums.AchievementType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserAchievementRepository
        extends JpaRepository<UserAchievement, UUID> {

    boolean existsByUserIdAndAchievementType(
            String userId,
            AchievementType achievementType
    );
}