package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.model.GenreExplorationTarget;
import com.spotinder.backend.discovery.model.GenreNeighborhood;
import com.spotinder.backend.discovery.model.GenreTaste;
import com.spotinder.backend.discovery.model.GenreTasteState;
import com.spotinder.backend.discovery.model.TasteProfile;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GenreExplorationService {

    private final GenreTasteClassifier genreTasteClassifier;
    private final GenreNeighborhoodService genreNeighborhoodService;

    public GenreExplorationService(
            GenreTasteClassifier genreTasteClassifier,
            GenreNeighborhoodService genreNeighborhoodService
    ) {
        this.genreTasteClassifier =
                genreTasteClassifier;

        this.genreNeighborhoodService =
                genreNeighborhoodService;
    }


    public List<GenreExplorationTarget> explore(
            TasteProfile profile
    ) {

        if (profile == null) {
            return List.of();
        }


        /*
         * =====================================================
         * 1. CLASSIFY USER'S CURRENT MUSICAL TERRITORY
         * =====================================================
         */

        Map<String, GenreTaste> taste =
                genreTasteClassifier.classify(
                        profile
                );


        /*
         * =====================================================
         * 2. CHOOSE GRAPH SEEDS
         * =====================================================
         *
         * For this first experiment:
         *
         * CORE + KNOWN genres represent established musical
         * territory.
         *
         * EMERGING is deliberately NOT a seed yet.
         *
         * We want to see where established taste can travel
         * before allowing newly discovered tastes to expand
         * the graph themselves.
         */

        List<String> seeds =
                taste.values()
                        .stream()
                        .filter(this::isSeed)
                        .map(GenreTaste::genre)
                        .distinct()
                        .toList();


        if (seeds.isEmpty()) {
            return List.of();
        }


        /*
         * =====================================================
         * 3. DISCOVER THE GRAPH
         * =====================================================
         */

        List<GenreNeighborhood> neighborhoods =
                genreNeighborhoodService.discover(
                        seeds
                );


        /*
         * =====================================================
         * 4. COMBINE GRAPH + USER TASTE
         * =====================================================
         */

        List<GenreExplorationTarget> targets =
                new ArrayList<>();


        for (GenreNeighborhood neighborhood : neighborhoods) {

            GenreTaste knownTaste =
                    taste.get(
                            neighborhood.genre()
                    );


            /*
             * A graph-discovered genre with no Spotify or
             * Spotinder evidence is genuinely UNKNOWN.
             */

            GenreTaste genreTaste =
                    knownTaste != null
                            ? knownTaste
                            : new GenreTaste(
                            neighborhood.genre(),
                            0.0,
                            0.0,
                            0.0,
                            0,
                            GenreTasteState.UNKNOWN
                    );

            targets.add(
                    new GenreExplorationTarget(

                            neighborhood.genre(),

                            genreTaste.state(),

                            genreTaste.spotifyAffinity(),

                            genreTaste.spotinderPreference(),
                            genreTaste.spotinderConfidence(),
                            genreTaste.spotinderEvidence(),

                            neighborhood.distance(),

                            neighborhood.parentGenre(),

                            neighborhood.edgeEvidence(),
                            neighborhood.edgeSampleSize(),
                            neighborhood.connectionStrength(),
                            neighborhood.edgeConfidence(),

                            neighborhood.pathStrength(),

                            neighborhood.path()
                    )
            );
        }


        /*
         * =====================================================
         * 5. SORT FOR DEBUGGING
         * =====================================================
         *
         * Seeds first.
         *
         * Then distance.
         *
         * Within each distance, strongest graph paths first.
         */

        return targets.stream()
                .sorted(
                        Comparator
                                .comparingInt(
                                        GenreExplorationTarget::graphDistance
                                )
                                .thenComparing(
                                        GenreExplorationTarget::pathStrength,
                                        Comparator.reverseOrder()
                                )
                                .thenComparing(
                                        GenreExplorationTarget::genre
                                )
                )
                .toList();
    }


    private boolean isSeed(
            GenreTaste taste
    ) {

        return taste.state() == GenreTasteState.CORE
                ||
                taste.state() == GenreTasteState.KNOWN;
    }
}