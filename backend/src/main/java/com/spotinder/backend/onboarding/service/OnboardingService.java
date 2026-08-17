package com.spotinder.backend.onboarding.service;


import com.spotinder.backend.onboarding.dto.OnboardingProfileResponse;
import com.spotinder.backend.onboarding.dto.OnboardingTrackResponse;
import com.spotinder.backend.spotify.dto.SpotifyTrackResponse;
import com.spotinder.backend.spotify.service.SpotifyService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class OnboardingService {

    private final SpotifyService spotifyService;

    public OnboardingService(SpotifyService spotifyService) {
        this.spotifyService = spotifyService;
    }


    public OnboardingProfileResponse getOnboardingProfile() {

        List<SpotifyTrackResponse> topTracks =
                spotifyService.getTopTracks();

        List<SpotifyTrackResponse> recentlyPlayed =
                spotifyService.getRecentlyPlayed();

        List<SpotifyTrackResponse> analyzedTracks =
                Stream.concat(
                                topTracks.stream(),
                                recentlyPlayed.stream()
                        )
                        .collect(
                                Collectors.toMap(
                                        SpotifyTrackResponse::id,
                                        track -> track,
                                        (existing, ignored) ->
                                                existing
                                )
                        )
                        .values()
                        .stream()
                        .toList();

        List<String> topArtists =
                topTracks.stream()
                        .map(
                                SpotifyTrackResponse::artist
                        )
                        .filter(
                                artist ->
                                        artist != null &&
                                                !artist.isBlank()
                        )
                        .collect(
                                Collectors.groupingBy(
                                        artist -> artist,
                                        Collectors.counting()
                                )
                        )
                        .entrySet()
                        .stream()
                        .sorted(
                                Map.Entry
                                        .<String, Long>
                                                comparingByValue()
                                        .reversed()
                        )
                        .limit(5)
                        .map(
                                Map.Entry::getKey
                        )
                        .toList();

        List<OnboardingTrackResponse> tracks =
                topTracks.stream()
                        .collect(
                                Collectors.toMap(
                                        SpotifyTrackResponse::artist,
                                        track -> track,
                                        (existing, ignored) ->
                                                existing
                                )
                        )
                        .values()
                        .stream()
                        .limit(5)
                        .map(track ->
                                new OnboardingTrackResponse(
                                        track.id(),
                                        track.title(),
                                        track.artist(),
                                        track.albumImage()
                                )
                        )
                        .toList();

        return new OnboardingProfileResponse(
                topArtists,
                tracks,
                analyzedTracks.size()
        );
    }
}
