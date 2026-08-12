package com.spotinder.backend.discovery.controller;

import com.spotinder.backend.discovery.dto.DailyDiscoveryResponse;
import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.discovery.service.DailyDiscoveryService;
import com.spotinder.backend.discovery.service.DiscoveryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/discover")
public class DiscoveryController {

    private final DiscoveryService discoveryService;
    private final DailyDiscoveryService dailyDiscoveryService;

    public DiscoveryController(DiscoveryService discoveryService, DailyDiscoveryService dailyDiscoveryService) {
        this.discoveryService = discoveryService;
        this.dailyDiscoveryService = dailyDiscoveryService;
    }

    @GetMapping
    public List<SongResponse> discover(){
        return discoveryService.discover();
    }

    @GetMapping("/daily")
    public DailyDiscoveryResponse getDailyDiscovery() {
        return dailyDiscoveryService.getToday();
    }

}