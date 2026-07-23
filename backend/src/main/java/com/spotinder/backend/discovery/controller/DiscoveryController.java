package com.spotinder.backend.discovery.controller;

import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.discovery.service.DiscoveryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/discover")
public class DiscoveryController {

    private final DiscoveryService discoveryService;

    public DiscoveryController(DiscoveryService discoveryService) {
        this.discoveryService = discoveryService;
    }

    @GetMapping
    public List<SongResponse> discover() {
        return discoveryService.discover();
    }

}
