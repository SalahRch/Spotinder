package com.spotinder.backend.discovery.dto;

import com.spotinder.backend.common.enums.DiscoveryPersona;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record JourneySummaryResponse(

        UUID id,

        LocalDate date,

        String journeyTitle,

        DiscoveryPersona discoveryPersona,

        Integer explored,

        Integer liked,

        Double likeRate,

        Double averageAdventureLevel,

        Instant completedAt

) {
}