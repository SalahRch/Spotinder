package com.spotinder.backend.onboarding.dto;

import java.util.List;

public record OnboardingProfileResponse(

        List<String> topArtists,

        List<OnboardingTrackResponse> topTracks,

        int songsAnalyzed,

        boolean needsGenreSelection

) {
}