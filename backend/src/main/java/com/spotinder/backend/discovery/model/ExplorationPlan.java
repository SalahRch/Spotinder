package com.spotinder.backend.discovery.model;

import java.util.List;

public record ExplorationPlan(
        int adventureLevel,
        List<PlannedGenre> genres
) {
}