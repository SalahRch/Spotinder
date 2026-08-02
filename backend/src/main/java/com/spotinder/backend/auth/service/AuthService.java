package com.spotinder.backend.auth.service;

import com.spotinder.backend.common.enums.SpotifyProduct;
import com.spotinder.backend.users.entity.User;
import com.spotinder.backend.users.repository.UserRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User synchronizeSpotifyUser(OAuth2User oauthUser) {

        String spotifyId = oauthUser.getAttribute("id");
        String displayName = oauthUser.getAttribute("display_name");
        String email = oauthUser.getAttribute("email");
        String country = oauthUser.getAttribute("country");
        String productString = oauthUser.getAttribute("product");

        SpotifyProduct product = SpotifyProduct.valueOf(productString.toUpperCase());

        String avatarUrl = null;

        var images = oauthUser.getAttribute("images");

        if (images instanceof java.util.List<?> imageList && !imageList.isEmpty()) {

            Object firstImage = imageList.getFirst();

            if (firstImage instanceof java.util.Map<?, ?> imageMap) {

                avatarUrl = (String) imageMap.get("url");

            }

        }
        User existingUser = userRepository.findBySpotifyId(spotifyId).orElse(null);

        if (existingUser != null) {
            return updateExistingUser(
                    existingUser,
                    displayName,
                    email,
                    avatarUrl,
                    country,
                    product
            );
        }

        return createNewUser(
                spotifyId,
                displayName,
                email,
                avatarUrl,
                country,
                product
        );
    }

    private User updateExistingUser(

            User user,
            String displayName,
            String email,
            String avatarUrl,
            String country,
            SpotifyProduct product

    ) {

        user.setDisplayName(displayName);
        user.setEmail(email);
        user.setAvatarUrl(avatarUrl);
        user.setCountry(country);
        user.setProduct(product);

        return userRepository.save(user);

    }

    private User createNewUser(

            String spotifyId,
            String displayName,
            String email,
            String avatarUrl,
            String country,
            SpotifyProduct product

    ) {

        User user = new User();

        user.setSpotifyId(spotifyId);
        user.setDisplayName(displayName);
        user.setEmail(email);
        user.setAvatarUrl(avatarUrl);
        user.setCountry(country);
        user.setProduct(product);

        // Default onboarding values
        user.setAdventureLevel(50);
        user.setBlindModeDefault(false);

        return userRepository.save(user);

    }

}