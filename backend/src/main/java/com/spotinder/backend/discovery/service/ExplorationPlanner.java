package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.model.ExplorationBucket;
import com.spotinder.backend.discovery.model.ExplorationPlan;
import com.spotinder.backend.discovery.model.GenreExplorationTarget;
import com.spotinder.backend.discovery.model.GenreTasteState;
import com.spotinder.backend.discovery.model.PlannedGenre;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExplorationPlanner {

    private static final int PLAN_SIZE = 10;

    public ExplorationPlan plan(
            List<GenreExplorationTarget> targets,
            int adventureLevel
    ) {

        int adventure =
                Math.max(
                        0,
                        Math.min(100, adventureLevel)
                );

        if (targets == null || targets.isEmpty()) {
            return new ExplorationPlan(
                    adventure,
                    List.of()
            );
        }

        /*
         * =====================================================
         * 1. SPLIT THE MUSICAL LANDSCAPE INTO BUCKETS
         * =====================================================
         */

        List<GenreExplorationTarget> anchors =
                targets.stream()
                        .filter(this::isAnchor)
                        .sorted(anchorComparator())
                        .toList();

        List<GenreExplorationTarget> emerging =
                targets.stream()
                        .filter(this::isEmerging)
                        .sorted(emergingComparator())
                        .toList();

        List<GenreExplorationTarget> nearby =
                diversifyByRoot(
                        targets.stream()
                                .filter(this::isNearby)
                                .sorted(explorationComparator())
                                .toList()
                );

        List<GenreExplorationTarget> frontier =
                diversifyByRoot(
                        targets.stream()
                                .filter(this::isFrontier)
                                .sorted(explorationComparator())
                                .toList()
                );


        /*
         * =====================================================
         * 2. ADVENTURE -> DESIRED MIX
         * =====================================================
         *
         * Adventure 0:
         *
         * anchor   = 80%
         * emerging = 10%
         * nearby   = 10%
         * frontier =  0%
         *
         *
         * Adventure 100:
         *
         * anchor   = 10%
         * emerging = 15%
         * nearby   = 30%
         * frontier = 45%
         */

        double adventureRatio =
                adventure / 100.0;

        double anchorWeight =
                lerp(
                        0.80,
                        0.10,
                        adventureRatio
                );

        double emergingWeight =
                lerp(
                        0.10,
                        0.15,
                        adventureRatio
                );

        double nearbyWeight =
                lerp(
                        0.10,
                        0.30,
                        adventureRatio
                );

        double frontierWeight =
                lerp(
                        0.00,
                        0.45,
                        adventureRatio
                );


        /*
         * =====================================================
         * 3. CONVERT WEIGHTS INTO GENRE COUNTS
         * =====================================================
         */

        int anchorCount =
                (int) Math.round(
                        PLAN_SIZE * anchorWeight
                );

        int emergingCount =
                (int) Math.round(
                        PLAN_SIZE * emergingWeight
                );

        int nearbyCount =
                (int) Math.round(
                        PLAN_SIZE * nearbyWeight
                );

        /*
         * Give the remaining slots to frontier so the final
         * requested allocation always totals PLAN_SIZE.
         */

        int frontierCount =
                PLAN_SIZE
                        - anchorCount
                        - emergingCount
                        - nearbyCount;

        frontierCount =
                Math.max(
                        0,
                        frontierCount
                );


        /*
         * =====================================================
         * 4. BUILD THE PLAN
         * =====================================================
         */

        List<PlannedGenre> planned =
                new ArrayList<>();

        addGenres(
                planned,
                anchors,
                anchorCount,
                ExplorationBucket.ANCHOR
        );

        addGenres(
                planned,
                emerging,
                emergingCount,
                ExplorationBucket.EMERGING
        );

        addGenres(
                planned,
                nearby,
                nearbyCount,
                ExplorationBucket.NEARBY
        );

        addGenres(
                planned,
                frontier,
                frontierCount,
                ExplorationBucket.FRONTIER
        );

        /*
         * =====================================================
         * 5. REDISTRIBUTE UNUSED SLOTS
         * =====================================================
         *
         * A bucket may not contain enough genres to satisfy
         * its requested allocation.
         *
         * Instead of falling back to the globally highest
         * scoring genre, redistribute missing slots according
         * to the CURRENT Adventure mixture.
         *
         * Low Adventure:
         *      prefers ANCHOR
         *
         * High Adventure:
         *      prefers FRONTIER / NEARBY
         */

        while (planned.size() < PLAN_SIZE) {

            List<BucketCandidatePool> pools =
                    new ArrayList<>();

            pools.add(
                    new BucketCandidatePool(
                            ExplorationBucket.ANCHOR,
                            anchorWeight,
                            anchors
                    )
            );

            pools.add(
                    new BucketCandidatePool(
                            ExplorationBucket.EMERGING,
                            emergingWeight,
                            emerging
                    )
            );

            pools.add(
                    new BucketCandidatePool(
                            ExplorationBucket.NEARBY,
                            nearbyWeight,
                            nearby
                    )
            );

            pools.add(
                    new BucketCandidatePool(
                            ExplorationBucket.FRONTIER,
                            frontierWeight,
                            frontier
                    )
            );


            /*
             * Highest Adventure-desired bucket gets first
             * opportunity to absorb the spare slot.
             */
            pools.sort(
                    Comparator.comparingDouble(
                            BucketCandidatePool::weight
                    ).reversed()
            );


            boolean added =
                    false;


            for (BucketCandidatePool pool : pools) {

                GenreExplorationTarget next =
                        findBestUnused(
                                pool.candidates(),
                                planned
                        );

                if (next == null) {
                    continue;
                }


                planned.add(
                        toPlannedGenre(
                                next,
                                pool.bucket()
                        )
                );

                added = true;

                break;
            }


            /*
             * No bucket has any unused candidate left.
             *
             * Prevent an infinite loop if the whole landscape
             * contains fewer than PLAN_SIZE selectable genres.
             */
            if (!added) {
                break;
            }
        }


        return new ExplorationPlan(
                adventure,
                List.copyOf(planned)
        );
    }

    private List<GenreExplorationTarget> diversifyByRoot(
            List<GenreExplorationTarget> candidates
    ) {

        if (candidates == null || candidates.isEmpty()) {
            return List.of();
        }

        /*
         * Candidates are already ranked by explorationScore.
         *
         * Group them by the established genre from which their
         * exploration path begins.
         */
        Map<String, List<GenreExplorationTarget>> byRoot =
                new LinkedHashMap<>();

        for (GenreExplorationTarget candidate : candidates) {

            String root =
                    rootGenre(candidate);

            byRoot.computeIfAbsent(
                    root,
                    ignored -> new ArrayList<>()
            ).add(candidate);
        }


        /*
         * Round-robin across roots.
         *
         * Example:
         *
         * house      -> afro house, afro tech, ...
         * cloud rap  -> horrorcore, hyperpop, ...
         * stutter    -> hypertechno, ...
         *
         * Result:
         *
         * afro house
         * horrorcore
         * hypertechno
         * afro tech
         * hyperpop
         * ...
         */
        List<GenreExplorationTarget> diversified =
                new ArrayList<>();

        int index = 0;

        boolean added;

        do {

            added = false;

            for (
                    List<GenreExplorationTarget> branch
                    : byRoot.values()
            ) {

                if (index >= branch.size()) {
                    continue;
                }

                diversified.add(
                        branch.get(index)
                );

                added = true;
            }

            index++;

        } while (added);


        return List.copyOf(diversified);
    }

    private String rootGenre(
            GenreExplorationTarget target
    ) {

        if (
                target.path() == null
                        ||
                        target.path().isEmpty()
        ) {
            return target.genre();
        }

        return target.path().get(0);
    }


    /*
     * =========================================================
     * BUCKET CLASSIFICATION
     * =========================================================
     */

    private boolean isAnchor(
            GenreExplorationTarget target
    ) {

        return target.graphDistance() == 0
                &&
                (
                        target.tasteState() == GenreTasteState.CORE
                                ||
                                target.tasteState() == GenreTasteState.KNOWN
                );
    }


    private boolean isEmerging(
            GenreExplorationTarget target
    ) {

        return target.tasteState()
                == GenreTasteState.EMERGING;
    }


    private boolean isNearby(
            GenreExplorationTarget target
    ) {

        return target.graphDistance() == 1
                &&
                (
                        target.tasteState() == GenreTasteState.UNKNOWN
                                ||
                                target.tasteState() == GenreTasteState.UNCERTAIN
                );
    }


    private boolean isFrontier(
            GenreExplorationTarget target
    ) {

        return target.graphDistance() >= 2
                &&
                (
                        target.tasteState() == GenreTasteState.UNKNOWN
                                ||
                                target.tasteState() == GenreTasteState.UNCERTAIN
                );
    }



    private ExplorationBucket determineBucket(
            GenreExplorationTarget target
    ) {

        if (isAnchor(target)) {
            return ExplorationBucket.ANCHOR;
        }

        if (isEmerging(target)) {
            return ExplorationBucket.EMERGING;
        }

        if (isNearby(target)) {
            return ExplorationBucket.NEARBY;
        }

        if (isFrontier(target)) {
            return ExplorationBucket.FRONTIER;
        }

        return null;
    }

    private GenreExplorationTarget findBestUnused(
            List<GenreExplorationTarget> candidates,
            List<PlannedGenre> planned
    ) {

        for (GenreExplorationTarget candidate : candidates) {

            if (
                    !containsGenre(
                            planned,
                            candidate.genre()
                    )
            ) {
                return candidate;
            }
        }

        return null;
    }


    /*
     * =========================================================
     * RANKING
     * =========================================================
     */

    private Comparator<GenreExplorationTarget>
    anchorComparator() {

        return Comparator
                .comparingInt(
                        this::anchorStateRank
                )
                .thenComparing(
                        this::anchorScore,
                        Comparator.reverseOrder()
                )
                .thenComparing(
                        GenreExplorationTarget::genre
                );
    }


    private int anchorStateRank(
            GenreExplorationTarget target
    ) {

        if (target.tasteState() == GenreTasteState.CORE) {
            return 0;
        }

        return 1;
    }


    private double anchorScore(
            GenreExplorationTarget target
    ) {

        double behavioralAffinity =
                Math.max(
                        0.0,
                        target.spotinderPreference()
                )
                        *
                        target.spotinderConfidence();

        return 0.60
                * target.spotifyAffinity()
                +
                0.40
                        * behavioralAffinity;
    }


    private Comparator<GenreExplorationTarget>
    emergingComparator() {

        return Comparator
                .comparing(
                        this::emergingScore,
                        Comparator.reverseOrder()
                )
                .thenComparing(
                        GenreExplorationTarget::genre
                );
    }


    private double emergingScore(
            GenreExplorationTarget target
    ) {

        return Math.max(
                0.0,
                target.spotinderPreference()
        )
                *
                target.spotinderConfidence();
    }


    private Comparator<GenreExplorationTarget>
    explorationComparator() {

        return Comparator
                .comparing(
                        this::explorationScore,
                        Comparator.reverseOrder()
                )
                .thenComparing(
                        GenreExplorationTarget::genre
                );
    }


    private double explorationScore(
            GenreExplorationTarget target
    ) {

        return target.pathStrength()
                *
                target.edgeConfidence();
    }


    /*
     * =========================================================
     * PLAN CREATION
     * =========================================================
     */

    private void addGenres(
            List<PlannedGenre> planned,
            List<GenreExplorationTarget> candidates,
            int count,
            ExplorationBucket bucket
    ) {

        int added = 0;

        for (GenreExplorationTarget target : candidates) {

            if (added >= count) {
                break;
            }

            if (
                    containsGenre(
                            planned,
                            target.genre()
                    )
            ) {
                continue;
            }

            planned.add(
                    toPlannedGenre(
                            target,
                            bucket
                    )
            );

            added++;
        }
    }


    private PlannedGenre toPlannedGenre(
            GenreExplorationTarget target,
            ExplorationBucket bucket
    ) {

        double score =
                switch (bucket) {

                    case ANCHOR ->
                            anchorScore(target);

                    case EMERGING ->
                            emergingScore(target);

                    case NEARBY, FRONTIER ->
                            explorationScore(target);
                };

        return new PlannedGenre(
                target.genre(),
                bucket,
                target.tasteState(),

                target.graphDistance(),
                target.pathStrength(),
                target.edgeConfidence(),

                score,

                target.path()
        );
    }


    private boolean containsGenre(
            List<PlannedGenre> planned,
            String genre
    ) {

        return planned.stream()
                .anyMatch(
                        item ->
                                item.genre()
                                        .equals(genre)
                );
    }


    /*
     * =========================================================
     * MATH
     * =========================================================
     */

    private double lerp(
            double start,
            double end,
            double amount
    ) {

        return start
                + (end - start) * amount;
    }

    private record BucketCandidatePool(
            ExplorationBucket bucket,
            double weight,
            List<GenreExplorationTarget> candidates
    ) {
    }
}