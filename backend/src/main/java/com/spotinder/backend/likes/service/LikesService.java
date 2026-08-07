package com.spotinder.backend.likes.service;

import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.likes.dto.LikedSongResponse;
import com.spotinder.backend.spotify.dto.SpotifyTrackResponse;
import com.spotinder.backend.spotify.service.SpotifyService;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class LikesService {

    private final CurrentUserService currentUserService;
    private final SwipeRepository swipeRepository;
    private final SpotifyService spotifyService;

    public LikesService(
            CurrentUserService currentUserService,
            SwipeRepository swipeRepository,
            SpotifyService spotifyService
    ) {
        this.currentUserService =
                currentUserService;

        this.swipeRepository =
                swipeRepository;

        this.spotifyService =
                spotifyService;
    }

    public List<LikedSongResponse> getLikedSongs() {

        User user =
                currentUserService.getCurrentUser();

        List<Swipe> likedSwipes =
                swipeRepository
                        .findByUserIdAndDirectionOrderByCreatedAtDesc(
                                user.getSpotifyId(),
                                SwipeDirection.RIGHT
                        );

        if (likedSwipes.isEmpty()) {
            return List.of();
        }

        List<String> trackIds =
                likedSwipes.stream()
                        .map(
                                Swipe::getSpotifyTrackId
                        )
                        .toList();

        List<SpotifyTrackResponse> tracks =
                spotifyService.getTracksByIds(
                        trackIds
                );

        return tracks.stream()
                .map(track ->
                        new LikedSongResponse(
                                track.id(),
                                track.title(),
                                track.artist(),
                                track.albumImage()
                        )
                )
                .toList();
    }
}