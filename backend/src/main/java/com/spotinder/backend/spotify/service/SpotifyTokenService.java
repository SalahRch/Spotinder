package com.spotinder.backend.spotify.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizeRequest;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class SpotifyTokenService {

    private final OAuth2AuthorizedClientManager authorizedClientManager;

    public SpotifyTokenService(
            OAuth2AuthorizedClientManager authorizedClientManager
    ) {
        this.authorizedClientManager = authorizedClientManager;
    }

    public String getAccessToken() {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (!(authentication instanceof OAuth2AuthenticationToken oauthToken)) {
            throw new IllegalStateException(
                    "The current user is not authenticated through Spotify."
            );
        }

        OAuth2AuthorizeRequest authorizeRequest =
                OAuth2AuthorizeRequest
                        .withClientRegistrationId(
                                oauthToken.getAuthorizedClientRegistrationId()
                        )
                        .principal(authentication)
                        .build();

        OAuth2AuthorizedClient authorizedClient =
                authorizedClientManager.authorize(authorizeRequest);



        if (
                authorizedClient == null ||
                        authorizedClient.getAccessToken() == null
        ) {
            throw new IllegalStateException(
                    "Spotify authorization is unavailable. "
                            + "Please reconnect your Spotify account."
            );
        }

        return authorizedClient
                .getAccessToken()
                .getTokenValue();
    }
}