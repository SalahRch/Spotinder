package com.spotinder.backend.discovery.service;

import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.spotify.dto.SpotifyTrackResponse;
import com.spotinder.backend.spotify.mapper.SpotifyTrackMapper;
import com.spotinder.backend.spotify.service.SpotifyService;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
public class DiscoveryService {

    private final SpotifyTrackMapper spotifyTrackMapper;
    private final RecommendationEngine recommendationEngine;
    private final SpotifyService spotifyService;
    private final CurrentUserService currentUserService;

    public DiscoveryService(SpotifyTrackMapper spotifyTrackMapper, RecommendationEngine recommendationEngine, SpotifyService spotifyService, CurrentUserService currentUserService) {
        this.spotifyTrackMapper = spotifyTrackMapper;
        this.recommendationEngine = recommendationEngine;
        this.spotifyService = spotifyService;
        this.currentUserService = currentUserService;
    }

    public List<SongResponse> discover() {

        User user = currentUserService.getCurrentUser();

        List<SpotifyTrackResponse> topTracks =
                spotifyService.getTopTracks();

        List<SpotifyTrackResponse> recentlyPlayed =
                spotifyService.getRecentlyPlayed();

        List<SongResponse> songs = Stream.concat(
                        topTracks.stream(),
                        recentlyPlayed.stream()
                )
                .collect(Collectors.toMap(
                        SpotifyTrackResponse::id,
                        track -> new SongResponse(
                                track.id(),
                                track.title(),
                                track.artist(),
                                track.albumImage()
                        ),
                        (existing, ignored) -> existing
                ))
                .values()
                .stream()
                .toList();

        return recommendationEngine.generateRecommendations(user, songs);
    }
}
