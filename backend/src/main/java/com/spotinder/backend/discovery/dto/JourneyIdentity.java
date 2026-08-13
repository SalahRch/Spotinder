package com.spotinder.backend.discovery.dto;

import com.spotinder.backend.common.enums.DiscoveryPersona;

public record JourneyIdentity(
        String title,
        DiscoveryPersona persona,
        String message
) {
}