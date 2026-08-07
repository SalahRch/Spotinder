package com.spotinder.backend.likes.dto;

public record LikedSongResponse(

        String id,

        String title,

        String artist,

        String albumImage

) {}