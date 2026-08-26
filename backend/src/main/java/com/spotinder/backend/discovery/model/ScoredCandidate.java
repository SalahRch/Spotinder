package com.spotinder.backend.discovery.model;

public record ScoredCandidate(

        DiscoveryCandidate candidate,
        double score

) {}