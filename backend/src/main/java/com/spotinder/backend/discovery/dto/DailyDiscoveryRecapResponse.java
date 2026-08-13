package com.spotinder.backend.discovery.dto;

import com.spotinder.backend.common.enums.DiscoveryPersona;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record DailyDiscoveryRecapResponse(

        UUID id,

        LocalDate date,

        String journeyTitle,

        DiscoveryPersona discoveryPersona,

        String recapMessage,

        Integer explored,

        Integer liked,

        double likeRate,

        Integer blindExplored,

        Integer blindLiked,

        double averageAdventureLevel,

        Instant completedAt

) {
}