package com.spotinder.backend.users.controller;

import com.spotinder.backend.users.dto.UserPreferencesRequest;
import com.spotinder.backend.users.dto.UserRequest;
import com.spotinder.backend.users.dto.UserResponse;
import com.spotinder.backend.users.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(
            @Valid @RequestBody UserRequest request
    ) {

        return userService.createUser(request);

    }

    @GetMapping("/{spotifyId}")
    public UserResponse getUser(
            @PathVariable String spotifyId
    ) {

        return userService.getUserBySpotifyId(spotifyId);

    }

    @PatchMapping("/{spotifyId}/preferences")
    public UserResponse updatePreferences(

            @PathVariable String spotifyId,

            @Valid
            @RequestBody UserPreferencesRequest request

    ) {

        return userService.updatePreferences(
                spotifyId,
                request
        );

    }

}