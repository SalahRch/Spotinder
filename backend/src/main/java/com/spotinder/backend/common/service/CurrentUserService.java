package com.spotinder.backend.common.service;

import com.spotinder.backend.common.exception.ResourceNotFoundException;
import com.spotinder.backend.users.entity.User;
import com.spotinder.backend.users.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService {

    private final UserRepository userRepository;

    public CurrentUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        OAuth2User oauthUser =
                (OAuth2User) authentication.getPrincipal();

        String spotifyId = oauthUser.getAttribute("id");

        return userRepository.findBySpotifyId(spotifyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }
}