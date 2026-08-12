package com.spotinder.backend.discovery.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record DailyDiscoveryResponse(

        UUID id,

        LocalDate date,

        Integer goal,

        Integer explored,

        Integer liked,

        boolean completed,

        Instant completedAt

) {
}