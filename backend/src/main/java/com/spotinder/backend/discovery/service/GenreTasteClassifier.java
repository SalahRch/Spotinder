package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.model.AffinitySignal;
import com.spotinder.backend.discovery.model.GenreTaste;
import com.spotinder.backend.discovery.model.GenreTasteState;
import com.spotinder.backend.discovery.model.TasteProfile;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class GenreTasteClassifier {

    /*
     * =========================================================
     * EXPERIMENTAL THRESHOLDS
     * =========================================================
     *
     * These are intentionally centralized here.
     *
     * We WILL tune them after inspecting real classifications.
     */

    private static final double CORE_SPOTIFY_AFFINITY = 0.70;
    private static final double KNOWN_SPOTIFY_AFFINITY = 0.30;

    private static final double STRONG_POSITIVE_PREFERENCE = 0.50;
    private static final double MODERATE_POSITIVE_PREFERENCE = 0.25;

    private static final double NEGATIVE_PREFERENCE = -0.20;

    private static final double HIGH_CONFIDENCE = 0.70;
    private static final double MEDIUM_CONFIDENCE = 0.45;


    public Map<String, GenreTaste> classify(
            TasteProfile profile
    ) {

        if (profile == null) {
            return Map.of();
        }


        Map<String, Double> spotify =
                profile.spotifyGenreAffinity();

        Map<String, AffinitySignal> spotinder =
                profile.discoveryGenreAffinity();


        /*
         * Union of everything we currently know about.
         */
        Set<String> genres =
                new LinkedHashSet<>();

        genres.addAll(
                spotify.keySet()
        );

        genres.addAll(
                spotinder.keySet()
        );


        Map<String, GenreTaste> result =
                new LinkedHashMap<>();


        for (String genre : genres) {

            double spotifyAffinity =
                    spotify.getOrDefault(
                            genre,
                            0.0
                    );


            AffinitySignal signal =
                    spotinder.get(
                            genre
                    );


            double preference =
                    signal != null
                            ? signal.preference()
                            : 0.0;

            double confidence =
                    signal != null
                            ? signal.confidence()
                            : 0.0;

            int evidence =
                    signal != null
                            ? signal.evidenceCount()
                            : 0;


            GenreTasteState state =
                    classifyState(
                            spotifyAffinity,
                            preference,
                            confidence
                    );


            result.put(
                    genre,
                    new GenreTaste(
                            genre,
                            spotifyAffinity,
                            preference,
                            confidence,
                            evidence,
                            state
                    )
            );
        }


        return result;
    }


    private GenreTasteState classifyState(
            double spotifyAffinity,
            double preference,
            double confidence
    ) {

        /*
         * =====================================================
         * 1. STRONG NEGATIVE DISCOVERY EVIDENCE
         * =====================================================
         *
         * Behavioral evidence should be able to tell us:
         *
         * "We've explored this already and the user
         * consistently wasn't interested."
         *
         * Adventure should NOT mistake this for unexplored
         * territory.
         */

        if (
                preference <= NEGATIVE_PREFERENCE &&
                        confidence >= HIGH_CONFIDENCE
        ) {
            return GenreTasteState.AVOID;
        }


        /*
         * =====================================================
         * 2. STRONG AGREEMENT / ESTABLISHED CORE
         * =====================================================
         */

        if (
                spotifyAffinity >= CORE_SPOTIFY_AFFINITY
                        &&
                        (
                                confidence < MEDIUM_CONFIDENCE
                                        ||
                                        preference >= MODERATE_POSITIVE_PREFERENCE
                        )
        ) {
            return GenreTasteState.CORE;
        }


        /*
         * Spotinder can also promote something into CORE
         * even if Spotify historically underrepresented it,
         * but we require strong behavioral evidence.
         */

        if (
                preference >= STRONG_POSITIVE_PREFERENCE &&
                        confidence >= HIGH_CONFIDENCE
        ) {
            return GenreTasteState.CORE;
        }


        /*
         * =====================================================
         * 3. KNOWN POSITIVE TERRITORY
         * =====================================================
         */

        if (
                spotifyAffinity >= KNOWN_SPOTIFY_AFFINITY
                        &&
                        preference > NEGATIVE_PREFERENCE
        ) {
            return GenreTasteState.KNOWN;
        }


        if (
                preference >= MODERATE_POSITIVE_PREFERENCE &&
                        confidence >= MEDIUM_CONFIDENCE
        ) {
            return GenreTasteState.KNOWN;
        }


        /*
         * =====================================================
         * 4. EMERGING TASTE
         * =====================================================
         *
         * Positive discovery signal exists, but confidence
         * is still developing.
         *
         * Example:
         *
         * Daft Punk like
         * -> french house
         * -> pref = 1.0
         * -> confidence = .28
         */

        if (
                preference >= MODERATE_POSITIVE_PREFERENCE
                        &&
                        confidence > 0.0
        ) {
            return GenreTasteState.EMERGING;
        }


        /*
         * =====================================================
         * 5. UNCERTAIN / CONFLICTING TERRITORY
         * =====================================================
         *
         * Some evidence exists, but we don't confidently know
         * whether this territory belongs to the user's taste.
         */

        if (
                spotifyAffinity > 0.0 ||
                        confidence > 0.0
        ) {
            return GenreTasteState.UNCERTAIN;
        }


        /*
         * This case becomes useful later when graph-discovered
         * genres are classified even though neither Spotify nor
         * Spotinder has evidence for them.
         */

        return GenreTasteState.UNKNOWN;
    }
}