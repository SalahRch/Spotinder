package com.spotinder.backend.swipes.repository;

import com.spotinder.backend.swipes.entity.Swipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SwipeRepository extends JpaRepository<Swipe, UUID> {

    Optional<Swipe> findByUserIdAndSpotifyTrackId(
            String userId,
            String spotifyTrackId
    );
}
