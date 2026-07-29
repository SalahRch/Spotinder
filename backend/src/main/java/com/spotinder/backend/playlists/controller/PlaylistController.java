package com.spotinder.backend.playlists.controller;

import com.spotinder.backend.playlists.dto.PlaylistRequest;
import com.spotinder.backend.playlists.dto.PlaylistResponse;
import com.spotinder.backend.playlists.service.PlaylistService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @PostMapping("/{spotifyId}")
    @ResponseStatus(HttpStatus.CREATED)
    public PlaylistResponse createPlaylist(
            @PathVariable String spotifyId,
            @RequestBody PlaylistRequest request
    ) {
        return playlistService.createPlaylist(
                spotifyId,
                request
        );
    }

}