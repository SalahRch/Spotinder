package com.spotinder.backend.discovery.service;

import com.spotinder.backend.discovery.dto.JourneyIdentity;
import com.spotinder.backend.common.enums.DiscoveryPersona;
import org.springframework.stereotype.Component;

@Component
public class JourneyIdentityEngine {

    public JourneyIdentity generate(
            double likeRate,
            double blindRate,
            double averageAdventureLevel
    ) {

        /*
         * Strong combination:
         * highly adventurous + heavily blind.
         */
        if (
                blindRate >= 70 &&
                        averageAdventureLevel >= 70
        ) {
            return new JourneyIdentity(
                    "Off the Map",
                    DiscoveryPersona.WILDCARD,
                    "You trusted your ears and wandered far beyond familiar territory."
            );
        }

        /*
         * Adventure was the dominant behavior.
         */
        if (averageAdventureLevel >= 75) {
            return new JourneyIdentity(
                    "Into the Unknown",
                    DiscoveryPersona.EXPLORER,
                    "You pushed beyond your usual taste and kept exploring."
            );
        }

        /*
         * Blind Discovery dominated the session.
         */
        if (blindRate >= 60) {
            return new JourneyIdentity(
                    "Trust Your Ears",
                    DiscoveryPersona.PURIST,
                    "Names mattered less today. Your ears made the decisions."
            );
        }

        /*
         * Very high like rate.
         */
        if (likeRate >= 75) {
            return new JourneyIdentity(
                    "No Skips Today",
                    DiscoveryPersona.ROMANTIC,
                    "You found something to love in nearly everything you heard."
            );
        }

        /*
         * Very selective session.
         */
        if (likeRate <= 30) {
            return new JourneyIdentity(
                    "A Careful Search",
                    DiscoveryPersona.CURATOR,
                    "You kept your standards high and chose only what really clicked."
            );
        }

        /*
         * Balanced/default session.
         */
        return new JourneyIdentity(
                "A Curious Detour",
                DiscoveryPersona.WANDERER,
                "You followed your curiosity and let the journey decide where to go."
        );
    }
}