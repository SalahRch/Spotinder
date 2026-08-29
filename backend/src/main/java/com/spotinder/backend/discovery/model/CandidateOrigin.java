package com.spotinder.backend.discovery.model;

import java.util.List;

public record CandidateOrigin(
        String plannedGenre,
        ExplorationBucket bucket,
        int graphDistance,
        double pathStrength,
        List<String> path
) {
}