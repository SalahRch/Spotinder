package com.spotinder.backend.discovery.model;

import java.util.List;

public record GenreExplorationTarget(
        String genre,
        GenreTasteState tasteState,

        double spotifyAffinity,

        double spotinderPreference,
        double spotinderConfidence,
        int spotinderEvidence,

        int graphDistance,
        String parentGenre,

        int edgeEvidence,
        int edgeSampleSize,
        double edgeStrength,
        double edgeConfidence,

        double pathStrength,
        List<String> path
) {
}