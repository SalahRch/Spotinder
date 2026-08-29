package com.spotinder.backend.discovery.model;

import java.util.List;

public record DiscoveryCandidate(
        String trackId,
        String title,
        String artistId,
        String artistName,
        List<String> artistGenres,
        String albumImage,
        String previewUrl,
        Integer durationMs,
        Integer popularity,
        CandidateOrigin origin
) {
}