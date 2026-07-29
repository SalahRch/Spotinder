package com.spotinder.backend.playlists.repository;

import com.spotinder.backend.playlists.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PlaylistRepository extends JpaRepository<Playlist, UUID> {
}
