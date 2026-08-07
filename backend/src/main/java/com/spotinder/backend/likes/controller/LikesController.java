package com.spotinder.backend.likes.controller;

import com.spotinder.backend.likes.dto.LikedSongResponse;
import com.spotinder.backend.likes.service.LikesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/likes")
public class LikesController {

    private final LikesService likesService;

    public LikesController(
            LikesService likesService
    ) {
        this.likesService = likesService;
    }

    @GetMapping
    public List<LikedSongResponse> getLikedSongs() {
        return likesService.getLikedSongs();
    }
}