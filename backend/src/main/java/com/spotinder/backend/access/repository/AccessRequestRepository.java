package com.spotinder.backend.access.repository;

import com.spotinder.backend.access.entity.AccessRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AccessRequestRepository
        extends JpaRepository<AccessRequest, UUID> {

    Optional<AccessRequest> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);
}