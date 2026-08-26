package com.spotinder.backend.discovery.model;

public enum AdventureBand {

    COMFORT,
    CURIOUS,
    EXPLORER,
    WILD;

    public static AdventureBand fromLevel(
            int level
    ) {

        if (level <= 25) {
            return COMFORT;
        }

        if (level <= 50) {
            return CURIOUS;
        }

        if (level <= 75) {
            return EXPLORER;
        }

        return WILD;
    }
}