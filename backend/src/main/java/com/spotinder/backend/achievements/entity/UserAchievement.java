package com.spotinder.backend.achievements.entity;

import com.spotinder.backend.common.enums.AchievementType;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "user_achievements",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {
                                "userId",
                                "achievementType"
                        }
                )
        }
)
public class UserAchievement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AchievementType achievementType;

    @CreationTimestamp
    private Instant unlockedAt;

    public UserAchievement() {
    }

    public UUID getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public AchievementType getAchievementType() {
        return achievementType;
    }

    public void setAchievementType(
            AchievementType achievementType
    ) {
        this.achievementType = achievementType;
    }

    public Instant getUnlockedAt() {
        return unlockedAt;
    }
}