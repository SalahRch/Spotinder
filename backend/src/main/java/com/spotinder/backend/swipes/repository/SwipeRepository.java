package com.spotinder.backend.swipes.repository;

import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.swipes.entity.Swipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SwipeRepository extends JpaRepository<Swipe, UUID> {

    Optional<Swipe> findByUserIdAndSpotifyTrackId(
            String userId,
            String spotifyTrackId
    );

    List<Swipe> findByUserId(String userId);

    List<Swipe> findByUserIdAndDirection(
            String userId,
            SwipeDirection direction
    );

    long countByUserIdAndDirection(
            String userId,
            SwipeDirection direction
    );

    long countByUserId(
            String userId
    );

    List<Swipe> findByUserIdAndDirectionOrderByCreatedAtDesc(
            String userId,
            SwipeDirection direction
    );

    List<Swipe> findByDiscoverySessionId(
            UUID discoverySessionId
    );

    List<Swipe> findTop3ByUserIdOrderByCreatedAtDesc(
            String userId
    );
}
