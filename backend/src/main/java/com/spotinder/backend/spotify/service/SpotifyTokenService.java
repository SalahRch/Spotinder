package com.spotinder.backend.spotify.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class SpotifyTokenService {

    private final OAuth2AuthorizedClientService authorizedClientService;

    public SpotifyTokenService(
            OAuth2AuthorizedClientService authorizedClientService
    ) {
        this.authorizedClientService = authorizedClientService;
    }

    public String getAccessToken() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        OAuth2AuthenticationToken oauthToken =
                (OAuth2AuthenticationToken) authentication;

        OAuth2AuthorizedClient client =
                authorizedClientService.loadAuthorizedClient(
                        oauthToken.getAuthorizedClientRegistrationId(),
                        oauthToken.getName()
                );


        return client.getAccessToken().getTokenValue();
    }
}