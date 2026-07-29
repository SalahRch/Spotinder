package com.spotinder.backend.users.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record UserPreferencesRequest(

        @Min(0)
        @Max(100)
        Integer adventureLevel,
        Boolean blindModeDefault

) {}
