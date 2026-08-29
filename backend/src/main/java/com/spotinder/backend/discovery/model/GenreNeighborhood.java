package com.spotinder.backend.discovery.model;

import java.util.List;

public record GenreNeighborhood(
        String genre,
        int distance,
        String parentGenre,

        int edgeEvidence,
        int edgeSampleSize,
        double connectionStrength,
        double edgeConfidence,

        double pathStrength,
        List<String> path
) {
}