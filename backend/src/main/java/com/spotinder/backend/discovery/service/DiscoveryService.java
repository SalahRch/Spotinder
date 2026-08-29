package com.spotinder.backend.discovery.service;

import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.discovery.model.DiscoveryCandidate;
import com.spotinder.backend.discovery.model.ExplorationPlan;
import com.spotinder.backend.discovery.model.GenreExplorationTarget;
import com.spotinder.backend.discovery.model.ScoredCandidate;
import com.spotinder.backend.discovery.model.TasteProfile;
import com.spotinder.backend.users.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class DiscoveryService {

    private static final int DISCOVERY_POOL_SIZE = 40;


    private final CurrentUserService currentUserService;

    private final TasteProfileBuilder tasteProfileBuilder;

    private final GenreExplorationService genreExplorationService;

    private final ExplorationPlanner explorationPlanner;

    private final DiscoveryCandidateGenerator
            discoveryCandidateGenerator;

    private final RecommendationEngine
            recommendationEngine;


    public DiscoveryService(
            CurrentUserService currentUserService,
            TasteProfileBuilder tasteProfileBuilder,
            GenreExplorationService genreExplorationService,
            ExplorationPlanner explorationPlanner,
            DiscoveryCandidateGenerator discoveryCandidateGenerator,
            RecommendationEngine recommendationEngine
    ) {

        this.currentUserService =
                currentUserService;

        this.tasteProfileBuilder =
                tasteProfileBuilder;

        this.genreExplorationService =
                genreExplorationService;

        this.explorationPlanner =
                explorationPlanner;

        this.discoveryCandidateGenerator =
                discoveryCandidateGenerator;

        this.recommendationEngine =
                recommendationEngine;
    }

    public List<SongResponse> discover() {

        long totalStart = System.nanoTime();

        /*
         * =========================================================
         * 1. CURRENT USER
         * =========================================================
         */

        long start = System.nanoTime();

        User user =
                currentUserService.getCurrentUser();

        logTime("Current user", start);


        /*
         * =========================================================
         * 2. BUILD TASTE PROFILE
         * =========================================================
         */

        start = System.nanoTime();

        TasteProfile tasteProfile =
                tasteProfileBuilder.build(user);

        logTime("Taste profile", start);


        /*
         * =========================================================
         * 3. RESOLVE ADVENTURE LEVEL
         * =========================================================
         */

        int adventureLevel =
                user.getAdventureLevel() != null
                        ? user.getAdventureLevel()
                        : 50;


        /*
         * =========================================================
         * 4. BUILD GENRE EXPLORATION LANDSCAPE
         * =========================================================
         */

        start = System.nanoTime();

        List<GenreExplorationTarget> targets =
                genreExplorationService.explore(
                        tasteProfile
                );

        logTime("Genre exploration", start);


        /*
         * =========================================================
         * 5. ADVENTURE → EXPLORATION PLAN
         * =========================================================
         */

        start = System.nanoTime();

        ExplorationPlan plan =
                explorationPlanner.plan(
                        targets,
                        adventureLevel
                );

        logTime("Exploration planning", start);

        Set<String> excludedTrackIds =
                Stream.concat(
                                tasteProfile.likedTrackIds().stream(),
                                tasteProfile.passedTrackIds().stream()
                        )
                        .collect(Collectors.toSet());


        /*
         * =========================================================
         * 6. GENERATE CANDIDATES
         * =========================================================
         */

        start = System.nanoTime();

        List<DiscoveryCandidate> candidates =
                discoveryCandidateGenerator.generate(
                        plan,
                        excludedTrackIds
                );

        logTime(
                "Candidate generation (" + candidates.size() + " candidates)",
                start
        );


        /*
         * =========================================================
         * 7. SCORE CANDIDATES
         * =========================================================
         */

        start = System.nanoTime();

        List<ScoredCandidate> ranked =
                recommendationEngine.rank(
                        tasteProfile,
                        candidates
                );

        logTime(
                "Ranking (" + ranked.size() + " candidates)",
                start
        );


        /*
         * =========================================================
         * 8. COMPOSE DIVERSE DECK
         * =========================================================
         */

        start = System.nanoTime();

        List<ScoredCandidate> composed =
                recommendationEngine.compose(
                        plan,
                        ranked
                );

        logTime(
                "Composition (" + composed.size() + " candidates)",
                start
        );


        /*
         * =========================================================
         * 9. FINAL POOL
         * =========================================================
         */

        List<SongResponse> result =
                composed.stream()
                        .limit(DISCOVERY_POOL_SIZE)
                        .map(ScoredCandidate::candidate)
                        .map(this::toSongResponse)
                        .toList();


        System.out.println();
        System.out.println("========== DISCOVERY PERFORMANCE ==========");
        System.out.println("Adventure level: " + adventureLevel);
        System.out.println("Targets: " + targets.size());
        System.out.println("Planned genres: " + plan.genres().size());
        System.out.println("Raw candidates: " + candidates.size());
        System.out.println("Final pool: " + result.size());
        System.out.printf(
                "TOTAL: %.2f ms%n",
                elapsedMs(totalStart)
        );
        System.out.println("===========================================");
        System.out.println();


        return result;
    }

    private void logTime(
            String stage,
            long start
    ) {

        System.out.printf(
                "[Discovery Performance] %-40s %8.2f ms%n",
                stage + ":",
                elapsedMs(start)
        );
    }


    private double elapsedMs(
            long start
    ) {

        return (System.nanoTime() - start)
                / 1_000_000.0;
    }


    /*
     * =============================================================
     * RESPONSE MAPPING
     * =============================================================
     */

    private SongResponse toSongResponse(
            DiscoveryCandidate candidate
    ) {

        return new SongResponse(
                candidate.trackId(),
                candidate.title(),
                candidate.artistName(),
                candidate.albumImage(),
                candidate.previewUrl()
        );
    }
}