package com.spotinder.backend.discovery.repository;

import com.spotinder.backend.discovery.entity.DiscoverySession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DiscoverySessionRepository
        extends JpaRepository<DiscoverySession, UUID> {

    List<DiscoverySession> findByUserIdOrderByStartedAtDesc(String userId);

}