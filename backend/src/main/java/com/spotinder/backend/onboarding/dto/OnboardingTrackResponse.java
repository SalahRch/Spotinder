package com.spotinder.backend.onboarding.dto;

public record OnboardingTrackResponse(

        String spotifyTrackId,

        String title,

        String artist,

        String albumImage

) {
}