package com.spotinder.backend.discovery.controller;

import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.discovery.service.DiscoveryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/discover")
public class DiscoveryController {

    private final DiscoveryService discoveryService;

    public DiscoveryController(DiscoveryService discoveryService) {
        this.discoveryService = discoveryService;
    }

    @GetMapping("/{spotifyId}")
    public List<SongResponse> discover(
            @PathVariable String spotifyId
    ) {
        return discoveryService.discover(spotifyId);
    }

}