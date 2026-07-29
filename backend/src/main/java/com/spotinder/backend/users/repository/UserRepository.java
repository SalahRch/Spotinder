package com.spotinder.backend.users.repository;

import com.spotinder.backend.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository
        extends JpaRepository<User, UUID> {

    Optional<User> findBySpotifyId(String spotifyId);

    boolean existsBySpotifyId(String spotifyId);

}
