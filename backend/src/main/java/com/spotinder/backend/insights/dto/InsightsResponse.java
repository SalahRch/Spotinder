package com.spotinder.backend.insights.dto;

public record InsightsResponse(

        long totalSwipes,

        long songsLiked,

        long songsPassed,

        double likeRatio,

        int discoveryScore

) {}