package com.spotinder.backend.discovery.model;


public record AffinitySignal(
        double preference,
        double confidence,
        int evidenceCount
) {}