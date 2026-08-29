package com.spotinder.backend.discovery.controller;

import com.spotinder.backend.discovery.dto.DailyDiscoveryRecapResponse;
import com.spotinder.backend.discovery.dto.JourneySummaryResponse;
import com.spotinder.backend.discovery.model.*;
import com.spotinder.backend.discovery.service.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/journeys")
public class JourneyController {

    private final DailyDiscoveryService
            dailyDiscoveryService;


    public JourneyController(
            DailyDiscoveryService dailyDiscoveryService
    ) {
        this.dailyDiscoveryService =
                dailyDiscoveryService;
    }

    @GetMapping
    public List<JourneySummaryResponse> getJourneys() {
        return dailyDiscoveryService.getJourneys();
    }

    @GetMapping("/{journeyId}")
    public DailyDiscoveryRecapResponse getJourney(
            @PathVariable UUID journeyId
    ) {
        return dailyDiscoveryService.getJourney(
                journeyId
        );
    }



}