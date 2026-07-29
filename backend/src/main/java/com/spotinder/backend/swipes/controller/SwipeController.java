package com.spotinder.backend.swipes.controller;

import com.spotinder.backend.swipes.dto.SwipeRequest;
import com.spotinder.backend.swipes.dto.SwipeResponse;
import com.spotinder.backend.swipes.service.SwipeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/swipes")
public class SwipeController {

    private final SwipeService swipeService;

    public SwipeController(SwipeService swipeService) {
        this.swipeService = swipeService;
    }

    @PostMapping("/{spotifyId}")
    public SwipeResponse recordSwipe(
            @PathVariable String spotifyId,
            @RequestBody SwipeRequest request
    ) {
        return swipeService.recordSwipe(spotifyId, request);
    }
}