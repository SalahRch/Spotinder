package com.spotinder.backend.insights.controller;

import com.spotinder.backend.insights.dto.InsightsResponse;
import com.spotinder.backend.insights.service.InsightsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/insights")
public class InsightsController {

    private final InsightsService insightsService;

    public InsightsController(InsightsService insightsService) {
        this.insightsService = insightsService;
    }

    @GetMapping
    public InsightsResponse getInsights() {
        return insightsService.getInsights();
    }

}