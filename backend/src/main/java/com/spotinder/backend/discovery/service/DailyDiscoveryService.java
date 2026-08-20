package com.spotinder.backend.discovery.service;

import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.discovery.dto.*;
import com.spotinder.backend.discovery.entity.DiscoverySession;
import com.spotinder.backend.discovery.repository.DiscoverySessionRepository;
import com.spotinder.backend.spotify.dto.SpotifyTrackResponse;
import com.spotinder.backend.spotify.service.SpotifyService;
import com.spotinder.backend.swipes.entity.Swipe;
import com.spotinder.backend.swipes.repository.SwipeRepository;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DailyDiscoveryService {

    private final CurrentUserService currentUserService;
    private final DiscoverySessionRepository discoverySessionRepository;
    private final SwipeRepository swipeRepository;
    private final JourneyIdentityEngine journeyIdentityEngine;
    private final SpotifyService spotifyService;

    public DailyDiscoveryService(
            CurrentUserService currentUserService,
            DiscoverySessionRepository discoverySessionRepository, SwipeRepository swipeRepository, JourneyIdentityEngine journeyIdentityEngine, SpotifyService spotifyService
    ) {
        this.currentUserService = currentUserService;
        this.discoverySessionRepository =
                discoverySessionRepository;
        this.swipeRepository = swipeRepository;
        this.journeyIdentityEngine = journeyIdentityEngine;
        this.spotifyService = spotifyService;
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

    private List<JourneyTrackResponse> getJourneyTracks(
            DiscoverySession session
    ) {

        List<Swipe> swipes =
                swipeRepository
                        .findByDiscoverySessionIdOrderByCreatedAtAsc(
                                session.getId()
                        );

        if (swipes.isEmpty()) {
            return List.of();
        }

        List<String> trackIds =
                swipes.stream()
                        .map(
                                Swipe::getSpotifyTrackId
                        )
                        .toList();

        List<SpotifyTrackResponse> spotifyTracks =
                spotifyService.getTracksByIds(
                        trackIds
                );

        Map<String, SpotifyTrackResponse> tracksById =
                spotifyTracks.stream()
                        .collect(
                                Collectors.toMap(
                                        SpotifyTrackResponse::id,
                                        track -> track
                                )
                        );

        return swipes.stream()
                .map(swipe -> {

                    SpotifyTrackResponse track =
                            tracksById.get(
                                    swipe.getSpotifyTrackId()
                            );

                    if (track == null) {
                        return null;
                    }

                    return new JourneyTrackResponse(
                            track.id(),
                            track.title(),
                            track.artist(),
                            track.albumImage(),
                            swipe.getDirection(),
                            swipe.isBlindMode(),
                            swipe.getAdventureLevel()
                    );
                })
                .filter(
                        Objects::nonNull
                )
                .toList();
    }

    public DailyDiscoveryRecapResponse getTodayRecap() {

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
                        .orElseThrow(() ->
                                new IllegalStateException(
                                        "No Daily Discovery found for today."
                                )
                        );

        if (!session.isCompleted()) {
            throw new IllegalStateException(
                    "Today's Daily Discovery is not completed yet."
            );
        }

        return toRecapResponse(session);
    }

    public List<JourneySummaryResponse> getJourneys() {

        User user =
                currentUserService.getCurrentUser();

        return discoverySessionRepository
                .findByUserIdAndCompletedTrueOrderByDiscoveryDateDesc(
                        user.getSpotifyId()
                )
                .stream()
                .map(this::toJourneySummary)
                .toList();
    }

    private List<JourneyTrackPreviewResponse> getJourneyTrackPreviews(
            DiscoverySession session
    ) {

        List<Swipe> swipes =
                swipeRepository
                        .findByDiscoverySessionId(
                                session.getId()
                        );

        List<String> trackIds =
                swipes.stream()
                        .map(Swipe::getSpotifyTrackId)
                        .limit(5)
                        .toList();

        if (trackIds.isEmpty()) {
            return List.of();
        }

        return spotifyService
                .getTracksByIds(trackIds)
                .stream()
                .map(track ->
                        new JourneyTrackPreviewResponse(
                                track.id(),
                                track.albumImage()
                        )
                )
                .toList();
    }

    private JourneySummaryResponse toJourneySummary(
            DiscoverySession session
    ) {

        List<JourneyTrackPreviewResponse> trackPreviews =
                getJourneyTrackPreviews(session);


        return new JourneySummaryResponse(
                session.getId(),
                session.getDiscoveryDate(),
                session.getJourneyTitle(),
                session.getDiscoveryPersona(),
                session.getSongsSeen(),
                session.getSongsLiked(),
                session.getLikeRate(),
                session.getAverageAdventureLevel(),
                session.getCompletedAt(),
                trackPreviews
        );
    }

    public DailyDiscoveryRecapResponse getJourney(
            UUID journeyId
    ) {

        User user =
                currentUserService.getCurrentUser();

        DiscoverySession session =
                discoverySessionRepository
                        .findById(journeyId)
                        .orElseThrow(() ->
                                new IllegalStateException(
                                        "Journey not found."
                                )
                        );

        if (
                !session.getUserId().equals(
                        user.getSpotifyId()
                )
        ) {
            throw new IllegalStateException(
                    "Journey not found."
            );
        }

        if (!session.isCompleted()) {
            throw new IllegalStateException(
                    "Journey is not completed."
            );
        }

        return toRecapResponse(session);
    }

    private DailyDiscoveryRecapResponse toRecapResponse(
            DiscoverySession session
    ) {


        List<JourneyTrackResponse> tracks =
                getJourneyTracks(session);



        return new DailyDiscoveryRecapResponse(
                session.getId(),
                session.getDiscoveryDate(),
                session.getJourneyTitle(),
                session.getDiscoveryPersona(),
                session.getRecapMessage(),
                session.getSongsSeen(),
                session.getSongsLiked(),
                session.getLikeRate(),
                session.getBlindExplored(),
                session.getBlindLiked(),
                session.getAverageAdventureLevel(),
                session.getCompletedAt(),
                tracks
        );
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

    public void finalizeSession(
            DiscoverySession session
    ) {
        List<Swipe> swipes =
                swipeRepository
                        .findByDiscoverySessionId(
                                session.getId()
                        );

        int explored =
                swipes.size();

        int liked =
                (int) swipes.stream()
                        .filter(swipe ->
                                swipe.getDirection() ==
                                        SwipeDirection.RIGHT
                        )
                        .count();

        int blindExplored =
                (int) swipes.stream()
                        .filter(Swipe::isBlindMode)
                        .count();

        int blindLiked =
                (int) swipes.stream()
                        .filter(Swipe::isBlindMode)
                        .filter(swipe ->
                                swipe.getDirection() ==
                                        SwipeDirection.RIGHT
                        )
                        .count();

        double likeRate =
                explored == 0
                        ? 0
                        : liked * 100.0 / explored;

        double blindRate =
                explored == 0
                        ? 0
                        : blindExplored * 100.0 / explored;

        double averageAdventureLevel =
                swipes.isEmpty()
                        ? 0
                        : swipes.stream()
                        .mapToInt(
                                Swipe::getAdventureLevel
                        )
                        .average()
                        .orElse(0);

        JourneyIdentity identity =
                journeyIdentityEngine.generate(
                        likeRate,
                        blindRate,
                        averageAdventureLevel
                );

        session.setLikeRate(
                likeRate
        );

        session.setBlindExplored(
                blindExplored
        );

        session.setBlindLiked(
                blindLiked
        );

        session.setAverageAdventureLevel(
                averageAdventureLevel
        );

        session.setJourneyTitle(
                identity.title()
        );

        session.setDiscoveryPersona(
                identity.persona()
        );

        session.setRecapMessage(
                identity.message()
        );

        discoverySessionRepository.save(
                session
        );
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