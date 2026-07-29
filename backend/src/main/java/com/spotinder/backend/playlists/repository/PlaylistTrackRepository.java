package com.spotinder.backend.playlists.repository;

import com.spotinder.backend.playlists.entity.PlaylistTrack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PlaylistTrackRepository
        extends JpaRepository<PlaylistTrack, UUID> {
}