package com.spotinder.backend.discovery.model;

import java.util.List;

public record PlannedGenre(
        String genre,
        ExplorationBucket bucket,
        GenreTasteState tasteState,

        int graphDistance,
        double pathStrength,
        double edgeConfidence,

        double explorationScore,

        List<String> path
) {
}