package com.spotinder.backend.access.service;

import com.spotinder.backend.access.entity.AccessRequest;
import com.spotinder.backend.access.repository.AccessRequestRepository;
import com.spotinder.backend.common.enums.AccessRequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccessRequestService {

    private final AccessRequestRepository repository;

    public void requestAccess(String email) {

        String normalizedEmail = email.trim().toLowerCase();

        if (repository.existsByEmailIgnoreCase(normalizedEmail)) {
            return;
        }

        AccessRequest request = AccessRequest.builder()
                .email(normalizedEmail)
                .status(AccessRequestStatus.PENDING)
                .build();

        repository.save(request);
    }
}