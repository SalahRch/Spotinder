package com.spotinder.backend.discovery.model;

public record ScoredCandidate(

        DiscoveryCandidate candidate,

        double tasteScore,
        double originScore,
        double finalScore

) {
}