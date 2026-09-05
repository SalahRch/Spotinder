# Architecture

## High-Level Architecture

``` text
                         +------------------+
                         | Spotify Accounts |
                         +---------+--------+
                                   |
                                OAuth 2.0
                                   |
                                   v
+------------------+      +-------+--------+       +------------------+
| React + Vite     | ---> | Spring Boot    | ----> | Spotify Web API  |
| Vercel           | REST | Railway        |       |                  |
+------------------+ <--- +-------+--------+       +------------------+
                                   |
                                   v
                         +---------+---------+
                         | PostgreSQL        |
                         | Supabase          |
                         +-------------------+
```

## Frontend

The current frontend is a React/Vite single-page application.

### Stack

-   React 19
-   TypeScript
-   Vite
-   Tailwind CSS
-   React Router
-   TanStack Query
-   Axios
-   Framer Motion
-   React Hot Toast

### Organization

The frontend follows a feature-oriented structure. Major feature areas
include authentication, access, onboarding, discovery, likes, insights,
playlists, achievements, profile, settings, and player functionality.

Shared application infrastructure lives under `app`, common UI under
`components`, and the Axios API client under `services`.

## Backend

The backend is a Java 21 Spring Boot modular monolith.

### Why a modular monolith?

The application has several clear business domains, but the MVP does not
need the deployment and operational complexity of microservices. A
modular monolith provides domain separation while keeping local
development, debugging, transactions, and deployment simple.

### Current domains

``` text
access
achievements
auth
common
discovery
insights
likes
onboarding
playlists
spotify
swipes
users
```

## Discovery Architecture

Discovery is implemented as a pipeline rather than one large
recommendation method:

``` text
CurrentUserService
      |
TasteProfileBuilder
      |
GenreTasteClassifier
      |
GenreExplorationService
      |
ExplorationPlanner
      |
DiscoveryCandidateGenerator
      |
RecommendationEngine.rank
      |
RecommendationEngine.compose
      |
SongResponse
```

This separation allows the system to independently evolve taste
modeling, exploration strategy, candidate retrieval, scoring, and final
deck diversity.

## Authentication

Spring Security and Spotify OAuth2 Client manage authentication.

Spotinder uses a server-side authenticated session. The frontend sends
credentials with API requests. Production cookies are configured as
secure, HTTP-only, and `SameSite=None` to support the separately hosted
frontend/backend.

## Data Ownership

PostgreSQL stores application-specific state such as users, preferences,
swipes, discovery sessions, playlists, access requests, and
achievements.

Spotify remains the source of truth for catalog and Spotify-owned data.

## Playback Architecture

Premium playback uses the Spotify Web Playback SDK plus backend Spotify
playback endpoints.

For Free users, the SDK is intentionally not initialized. The shared
player context opens the exact Spotify track externally instead. This
keeps playback behavior centralized across the application.

## Deployment

-   Frontend: Vercel
-   Backend: Railway
-   Database: Supabase PostgreSQL
-   Local/container development: Docker / Docker Compose
