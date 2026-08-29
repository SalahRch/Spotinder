package com.spotinder.backend.discovery.model;

public record GenreTaste(
        String genre,

        double spotifyAffinity,

        double spotinderPreference,
        double spotinderConfidence,
        int spotinderEvidence,

        GenreTasteState state
) {
}