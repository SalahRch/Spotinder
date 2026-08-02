package com.spotinder.backend.playlists.service;

import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.common.exception.ResourceNotFoundException;
import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.playlists.dto.PlaylistRequest;
import com.spotinder.backend.playlists.dto.PlaylistResponse;
import com.spotinder.backend.playlists.entity.Playlist;
import com.spotinder.backend.playlists.entity.PlaylistTrack;
import com.spotinder.backend.playlists.repository.PlaylistRepository;
import com.spotinder.backend.playlists.repository.PlaylistTrackRepository;
import com.spotinder.backend.spotify.dto.playlist.CreatePlaylistResponse;
import com.spotinder.backend.spotify.service.SpotifyService;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PlaylistService {

    private final SpotifyService spotifyService;
    private final CurrentUserService currentUserService;
    private final SwipeRepository swipeRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistTrackRepository playlistTrackRepository;

    public PlaylistService(
            SpotifyService spotifyService, CurrentUserService currentUserService,
            SwipeRepository swipeRepository,
            PlaylistRepository playlistRepository,
            PlaylistTrackRepository playlistTrackRepository
    ) {
        this.spotifyService = spotifyService;
        this.currentUserService = currentUserService;
        this.swipeRepository = swipeRepository;
        this.playlistRepository = playlistRepository;
        this.playlistTrackRepository = playlistTrackRepository;
    }

    @Transactional
    public PlaylistResponse createPlaylist(
            PlaylistRequest request
    ) {

        User user =
                currentUserService.getCurrentUser();

        List<Swipe> likedSongs = swipeRepository.findByUserIdAndDirection(
                user.getSpotifyId(),
                SwipeDirection.RIGHT
        );

        if (likedSongs.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No liked songs found to generate a playlist."
            );
        }

        Playlist playlist = new Playlist();

        playlist.setUserId(user.getSpotifyId());
        playlist.setName(request.name());
        playlist.setGeneratedByAi(false);

        playlistRepository.save(playlist);

        List<PlaylistTrack> playlistTracks = likedSongs.stream()
                .map(swipe -> {

                    PlaylistTrack track = new PlaylistTrack();

                    track.setPlaylist(playlist);
                    track.setSpotifyTrackId(swipe.getSpotifyTrackId());

                    return track;

                })
                .toList();

        playlistTrackRepository.saveAll(playlistTracks);


        List<String> tracks = likedSongs.stream()
                .map(Swipe::getSpotifyTrackId)
                .toList();

        CreatePlaylistResponse spotifyPlaylist =
                spotifyService.createPlaylist(
                        user.getSpotifyId(),
                        request.name()
                );

        spotifyService.addTracksToPlaylist(
                spotifyPlaylist.id(),
                tracks
        );

        playlist.setSpotifyPlaylistId(
                spotifyPlaylist.id()
        );

        return new PlaylistResponse(
                playlist.getId(),
                playlist.getName(),
                spotifyPlaylist.id(),
                spotifyPlaylist.externalUrls().spotify(),
                tracks
        );
    }

}