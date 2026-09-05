# User Journey

## Overview

``` text
Landing
  |
  v
Spotify OAuth
  |
  v
Analyze listening data
  |
  +-------------------------------+
  |                               |
Enough Spotify history       Little/no history
  |                               |
  v                               v
Discovery Profile            Choose 3 Genres
  |                               |
  +---------------+---------------+
                  |
                  v
            Adventure Mode
                  |
                  v
               Discover
          /        |        \
       Pass       Like      Playback
                   |
                   v
                 Likes
                   |
                   v
          Create Spotify Playlist

Additional areas:
Insights | Journeys | Achievements | Profile
```

## 1. Landing and Access

The landing page explains the product and demonstrates the swipe
interaction. During Spotify Development Mode, users who are not yet
allowlisted can submit an early-access request.

## 2. Spotify Authentication

Authentication is delegated to Spotify OAuth. Spotinder does not manage
passwords.

After successful authentication, the backend can access the Spotify
scopes required for profile data, top listening data, recently played
tracks, playlist operations, and playback features.

## 3. Taste Initialization

Spotinder first tries to infer taste from Spotify.

For established accounts, top artists and top tracks form the initial
profile.

For accounts without sufficient listening history, onboarding asks the
user to select exactly three genres. These selections bootstrap the same
discovery pipeline instead of blocking the user.

## 4. Adventure Mode

Adventure Mode is a value from conservative to exploratory. It affects
the *composition of the musical territory Spotinder explores*, rather
than simply adding a random bonus to a track score.

Lower values favor established/anchor genres. Higher values allocate
more of the discovery plan to nearby and frontier genres.

## 5. Discover

The Discover page is the core interaction.

Users can: - play/open the current track; - swipe right to Like; - swipe
left to Pass; - enable Blind Discovery; - adjust discovery preferences.

Every swipe becomes new behavioral evidence for future discovery.

## 6. Playback

Premium Spotify accounts receive integrated playback inside Spotinder.

For Free accounts, pressing the same play control opens the exact track
on Spotify. The rest of the discovery experience remains available.

## 7. Likes and Playlists

Liked tracks are collected in the Likes experience. Users can use their
discoveries to create a Spotify playlist through Spotinder.

## 8. Insights, Journeys and Achievements

Spotinder turns discovery history into a broader experience: - Insights
summarize listening/discovery behavior. - Journeys represent discovery
sessions and their musical identity. - Achievements reward milestones
and exploration behavior.

## 9. Profile

The profile exposes the connected Spotify identity, preferences,
discovery settings, and related user information.
