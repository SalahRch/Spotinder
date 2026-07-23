package com.spotinder.backend.discovery.dto;


public record SongResponse(
        String id,
        String title,
        String artist,
        String albumImage
) {}