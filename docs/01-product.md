# Product Specification

## Vision

**Spotinder exists to make discovering music as enjoyable as listening
to it.**

Spotinder is a music discovery platform that combines a user's Spotify
taste with interactive discovery. It is not intended to replace Spotify
or host music. Its purpose is to make the *discovery* step more focused,
playful, and personalized.

## Problem

Large music catalogs create a paradox of choice. Listeners often return
to the same artists and playlists even when they want something new.
Spotinder reduces that friction to a simple loop:

``` text
Listen -> Decide -> Swipe -> Learn -> Recommend Better
```

## Product Principles

1.  **Discovery should be effortless.** The main interaction should
    require very little explanation.
2.  **Personalization should improve with behavior.** Spotify data
    provides the initial signal; Spotinder swipes add first-party
    discovery feedback.
3.  **Exploration should be controllable.** Adventure Mode gives the
    user direct influence over how far recommendations move from
    established taste.
4.  **Discovery can be unbiased.** Blind Discovery can hide identity
    signals until the decision is made.
5.  **Spotify remains the playback/catalog platform.** Spotinder focuses
    on discovery, not replacing a streaming service.
6.  **The interface should feel playful and premium.** Motion and visual
    feedback support the core interaction rather than distracting from
    it.

## Current Feature Set

### Authentication and onboarding

-   Spotify OAuth
-   Spotify profile import
-   Listening-profile analysis
-   Fresh-account fallback: choose exactly three genres when Spotify
    cannot provide enough taste data
-   Adventure Mode configuration

### Discovery

-   Personalized swipe deck
-   Like / Pass
-   Blind Discovery
-   Adventure Mode
-   Daily Discovery
-   Discovery journeys
-   Persistence of swipe history

### Library and playlists

-   Liked songs
-   Spotify playlist creation

### Personalization and engagement

-   Insights
-   Achievements
-   Discovery profile
-   User preferences

### Playback

-   Spotify Premium: in-app playback
-   Spotify Free: open the exact track on Spotify

### Access

-   Early-access request flow for the Spotify Development Mode period

## Non-Goals

Spotinder is not: - a Spotify replacement; - an audio hosting service; -
a social network; - a messaging platform; - a raw music-streaming
backend.

## MVP Status

The functional MVP is complete. The remaining planned work is primarily
mobile/responsive polish and final cross-device QA.
