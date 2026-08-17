package com.spotinder.backend.onboarding.controller;

import com.spotinder.backend.onboarding.dto.OnboardingProfileResponse;
import com.spotinder.backend.onboarding.service.OnboardingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/onboarding")
public class OnboardingController {

    private final OnboardingService onboardingService;

    public OnboardingController(
            OnboardingService onboardingService
    ) {
        this.onboardingService =
                onboardingService;
    }

    @GetMapping("/profile")
    public OnboardingProfileResponse getProfile() {
        return onboardingService
                .getOnboardingProfile();
    }
}