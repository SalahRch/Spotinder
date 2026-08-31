package com.spotinder.backend.access.controller;

import com.spotinder.backend.access.dto.CreateAccessRequest;
import com.spotinder.backend.access.service.AccessRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/access-requests")
@RequiredArgsConstructor
public class AccessRequestController {

    private final AccessRequestService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void requestAccess(
            @Valid @RequestBody CreateAccessRequest request
    ) {
        service.requestAccess(request.email());
    }
}