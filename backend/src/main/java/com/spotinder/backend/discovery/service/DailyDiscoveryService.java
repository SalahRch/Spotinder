package com.spotinder.backend.discovery.service;

import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.discovery.dto.DailyDiscoveryResponse;
import com.spotinder.backend.discovery.entity.DiscoverySession;
import com.spotinder.backend.discovery.repository.DiscoverySessionRepository;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DailyDiscoveryService {

    private final CurrentUserService currentUserService;
    private final DiscoverySessionRepository discoverySessionRepository;

    public DailyDiscoveryService(
            CurrentUserService currentUserService,
            DiscoverySessionRepository discoverySessionRepository
    ) {
        this.currentUserService = currentUserService;
        this.discoverySessionRepository =
                discoverySessionRepository;
    }

    public DailyDiscoveryResponse getToday() {

        User user =
                currentUserService.getCurrentUser();

        LocalDate today =
                LocalDate.now();

        DiscoverySession session =
                discoverySessionRepository
                        .findByUserIdAndDiscoveryDate(
                                user.getSpotifyId(),
                                today
                        )
                        .orElseGet(() ->
                                createSession(
                                        user,
                                        today
                                )
                        );

        return toResponse(session);
    }

    private DiscoverySession createSession(
            User user,
            LocalDate today
    ) {

        DiscoverySession session =
                new DiscoverySession();

        session.setUserId(
                user.getSpotifyId()
        );

        session.setDiscoveryDate(
                today
        );

        return discoverySessionRepository
                .save(session);
    }

    private DailyDiscoveryResponse toResponse(
            DiscoverySession session
    ) {

        return new DailyDiscoveryResponse(
                session.getId(),
                session.getDiscoveryDate(),
                session.getGoal(),
                session.getSongsSeen(),
                session.getSongsLiked(),
                session.isCompleted(),
                session.getCompletedAt()
        );
    }
}