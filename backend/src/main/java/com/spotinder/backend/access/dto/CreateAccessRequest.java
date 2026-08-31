package com.spotinder.backend.access.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateAccessRequest(
        @NotBlank
        @Email
        String email
) {}