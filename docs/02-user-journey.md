# 📄 User Journey

# Spotinder

This document describes the complete user journey from opening Spotinder for the first time to discovering music, creating playlists, and viewing insights.

---

# 🎯 Journey Overview

```text
Landing Page
      │
      ▼
Spotify Login
      │
      ▼
Analyzing Spotify Library
      │
      ▼
Discovery Profile
      │
      ▼
Adventure Mode Setup
      │
      ▼
Home
      │
      ├────────► Song Details
      │
      ├────────► Like Song
      │
      ├────────► Pass Song
      │
      ▼
Liked Songs
      │
      ▼
Create Playlist
      │
      ▼
Insights
      │
      ▼
Profile
```

---

# 1. Landing Page

## Goal

Introduce Spotinder and encourage users to sign in.

## UI

- Spotinder logo
- Tagline
- Animated phone mockup
- Floating blurred album covers
- Subtle animated audio waveform
- **Animated Hero** showcasing the core interaction:
    - A new song card appears every 2–3 seconds
    - Album artwork changes
    - Song title and artist update
    - Automatic swipe animation (Like / Pass)
    - Infinite loop demonstrating the discovery experience
- Continue with Spotify button

### First Impression

The landing page should communicate Spotinder's purpose within the first 5 seconds.

The user should immediately understand:

- This is a music discovery platform.
- Spotify integration is seamless.
- Swiping is the primary interaction.
- The experience feels modern, playful, and premium.

## Actions

- Continue with Spotify

---

# 2. Spotify Authentication

User authenticates using Spotify OAuth.

No account creation.

No password.

After authentication, Spotinder retrieves:

- Spotify profile
- Top artists
- Top tracks
- Recently played songs
- User playlists

---

# 3. Discovery Profile

Instead of asking users what they like, Spotinder analyzes their Spotify account.

Display:

- Top Genres
- Top Artists
- Songs analyzed
- Listening summary

Example:

🎸 Alternative Rock

🎤 Arctic Monkeys

🎧 1,247 songs analyzed

---

# 4. Adventure Mode

The only onboarding interaction.

Question:

> How adventurous do you want your recommendations to be?

Slider:

```text
Comfort Zone ●━━━━━━━━━━ Explore Everything
```

This preference influences recommendation diversity.

---

# 5. Home

The primary screen of the application.

## Contains

- Greeting
- Daily recommendation
- Swipe card
- Progress indicator
- Bottom navigation

## Actions

- Like
- Pass
- Open song details
- Open artist
- Open Spotify

---

# 6. Song Details

Sliding drawer.

Contains:

- Album artwork
- Song
- Artist
- Album
- Genre
- Popularity
- Preview
- Open in Spotify

---

# 7. Blind Discovery

Optional mode.

When enabled:

Hide

- Artist
- Album
- Popularity

Reveal only after the swipe.

Purpose:

Encourage unbiased music discovery.

---

# 8. Liked Songs

Displays every liked song.

Users can:

- Search
- Sort
- Remove songs
- Open in Spotify

---

# 9. Playlist Generation

Once enough songs are liked:

Spotinder suggests:

> Ready to build your playlist?

Users can:

- Name playlist
- Generate playlist
- Open playlist in Spotify

---

# 10. Insights

Displays listening analytics.

Examples:

- Favorite genres
- Favorite artists
- Discovery score
- Listening personality
- Total swipes
- Like / Pass ratio
- Average song popularity
- Average song energy

---

# 11. Profile

Displays:

- Spotify profile
- Connected account
- Discovery settings
- Adventure Mode preference
- Statistics

---

# Navigation

```text
🏠 Home

❤️ Likes

📊 Insights

👤 Profile
```

AI will be added later as a separate page.

---

# Future Journey

Version 2 introduces:

- Daily Discovery
- AI Playlist Generator
- AI Discovery Assistant
- Smart Mixes
- Mood-based recommendations

---

# Design Philosophy

Every interaction should answer one question:

> "How quickly can we help the user discover a song they'll love?"

Anything that slows down discovery should be simplified or removed.