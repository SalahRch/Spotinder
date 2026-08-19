package com.spotinder.backend.achievements.controller;

import com.spotinder.backend.achievements.dto.AchievementResponse;
import com.spotinder.backend.achievements.service.AchievementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/achievements")
public class AchievementController {

    private final AchievementService achievementService;

    public AchievementController(
            AchievementService achievementService
    ) {
        this.achievementService =
                achievementService;
    }

    @GetMapping
    public List<AchievementResponse> getAchievements() {

        return achievementService
                .getAchievements();
    }
}