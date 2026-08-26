package com.spotinder.backend.discovery.model;

import java.util.Map;
import java.util.Set;

public record TasteProfile(

        Set<String> topArtistIds,

        Set<String> topTrackIds,

        Map<String, Double> spotifyArtistAffinity,

        Map<String, Double> spotifyGenreAffinity,

        Map<String, AffinitySignal> discoveryArtistAffinity,

        Map<String, AffinitySignal> discoveryGenreAffinity,

        Set<String> likedTrackIds,

        Set<String> passedTrackIds,

        long totalSwipes

) {}