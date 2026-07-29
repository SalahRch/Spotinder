package com.spotinder.backend.discovery.dto;

import java.time.Instant;
import java.util.UUID;

public record DiscoverySessionResponse(

        UUID id,

        String userId,

        Instant startedAt,

        Instant endedAt,

        Integer songsSeen,

        Integer songsLiked,

        boolean blindMode,

        Integer adventureLevel

) {}