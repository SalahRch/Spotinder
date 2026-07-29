package com.spotinder.backend.discovery.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record DiscoverySessionRequest(

        @NotBlank
        String userId,

        boolean blindMode,

        @Min(0)
        @Max(100)
        Integer adventureLevel

) {}