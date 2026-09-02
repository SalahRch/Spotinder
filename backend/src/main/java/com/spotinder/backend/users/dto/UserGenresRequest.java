package com.spotinder.backend.users.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record UserGenresRequest(

        @NotNull
        @Size(
                min = 3,
                max = 3,
                message = "Exactly 3 genres are required."
        )
        Set<String> genres

) {
}