package com.spotinder.backend.spotify.controller;

import com.spotinder.backend.spotify.dto.PlayTrackRequest;
import com.spotinder.backend.spotify.service.SpotifyService;
import com.spotinder.backend.spotify.service.SpotifyTokenService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/spotify")
public class SpotifyPlaybackController {

    private final SpotifyTokenService spotifyTokenService;
    private final SpotifyService spotifyService;

    public SpotifyPlaybackController(
            SpotifyTokenService spotifyTokenService, SpotifyService spotifyService
    ) {
        this.spotifyTokenService = spotifyTokenService;
        this.spotifyService = spotifyService;
    }

    @GetMapping("/playback-token")
    public Map<String, String> getPlaybackToken() {

        String accessToken =
                spotifyTokenService.getAccessToken();

        return Map.of(
                "accessToken",
                accessToken
        );
    }

    @PostMapping("/play")
    public void playTrack(
            @RequestBody PlayTrackRequest request
    ) {
        spotifyService.playTrack(
                request.deviceId(),
                request.spotifyTrackId()
        );
    }
}