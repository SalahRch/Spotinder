package com.spotinder.backend.users.service;

import com.spotinder.backend.common.exception.ResourceAlreadyExistsException;
import com.spotinder.backend.common.exception.ResourceNotFoundException;
import com.spotinder.backend.common.service.CurrentUserService;
import com.spotinder.backend.users.dto.UserPreferencesRequest;
import com.spotinder.backend.users.dto.UserRequest;
import com.spotinder.backend.users.dto.UserResponse;
import com.spotinder.backend.users.entity.User;
import com.spotinder.backend.users.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CurrentUserService currentUserService;

    public UserService(UserRepository userRepository, CurrentUserService currentUserService) {
        this.userRepository = userRepository;
        this.currentUserService = currentUserService;
    }

    public UserResponse createUser(UserRequest request) {


        if (userRepository.existsBySpotifyId(request.spotifyId())) {
            throw new ResourceAlreadyExistsException(
                    "A user with this Spotify account already exists."
            );
        }

        User user = new User();

        user.setSpotifyId(request.spotifyId());
        user.setDisplayName(request.displayName());
        user.setEmail(request.email());
        user.setAvatarUrl(request.avatarUrl());
        user.setCountry(request.country());
        user.setProduct(request.product());

        User savedUser = userRepository.save(user);

        return toResponse(savedUser);
    }

    public UserResponse getCurrentUser() {

        User user = currentUserService.getCurrentUser();

        return toResponse(user);
    }

    public UserResponse updatePreferences(
            UserPreferencesRequest request
    ) {

        User user =
                currentUserService.getCurrentUser();

        if (request.adventureLevel() != null) {
            user.setAdventureLevel(
                    request.adventureLevel()
            );
        }

        if (request.blindModeDefault() != null) {
            user.setBlindModeDefault(
                    request.blindModeDefault()
            );
        }

        User updatedUser =
                userRepository.save(user);

        return toResponse(updatedUser);
    }


    private UserResponse toResponse(User user) {

        return new UserResponse(
                user.getSpotifyId(),
                user.getDisplayName(),
                user.getEmail(),
                user.getAvatarUrl(),
                user.getCountry(),
                user.getProduct(),
                user.getAdventureLevel(),
                user.isBlindModeDefault(),
                user.getCreatedAt()
        );

    }

}