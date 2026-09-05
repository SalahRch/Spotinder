# Spotinder

> **Spotinder exists to make discovering music as enjoyable as listening
> to it.**

Spotinder is a full-stack music discovery platform built around Spotify.
It turns discovery into an interactive experience: users connect their
Spotify account, build a taste profile, control how adventurous
recommendations should be, and discover tracks through swipe-based
interactions.

The project combines a React frontend, a Spring Boot backend,
PostgreSQL, Spotify OAuth, a custom recommendation pipeline, playlist
generation, insights, achievements, discovery journeys, and Spotify
playback integration.

> **Current status:** MVP feature-complete. Mobile responsiveness is the
> remaining polish pass.

## Highlights

-   Spotify OAuth authentication --- no separate Spotinder password
-   Personalized discovery using Spotify listening history and Spotinder
    swipe behavior
-   Swipe-based Like / Pass discovery
-   **Adventure Mode** to control recommendation exploration
-   **Blind Discovery** to reduce artist/album bias
-   Fresh-account onboarding with manual genre selection when Spotify
    has insufficient listening data
-   Liked-song library and Spotify playlist creation
-   Listening insights, discovery journeys, daily discovery, and
    achievements
-   Spotify Premium in-app playback through the Web Playback SDK
-   Spotify Free fallback that opens the exact track on Spotify
-   Early-access request flow for Spotify Development Mode
-   Production deployment with Vercel, Railway, and Supabase

## Recommendation Pipeline

Spotinder does not simply display a Spotify recommendation feed. The
backend builds and ranks its own discovery pool.

``` text
Spotify listening signals + Spotinder swipe history
                         |
                         v
                  Taste Profile
                         |
                         v
               Genre Classification
                         |
                         v
               Genre Exploration Graph
                         |
                         v
                  Adventure Mode
                         |
                         v
                Exploration Plan
                         |
                         v
              Candidate Generation
                         |
                         v
              Filtering + Scoring
                         |
                         v
                Diverse Composition
                         |
                         v
                Discovery Swipe Deck
```

For the full explanation, see [How Recommendations
Work](docs/08-recommendation-engine.md).

## Tech Stack

### Frontend

-   React 19
-   TypeScript
-   Vite
-   Tailwind CSS
-   TanStack Query
-   Axios
-   Framer Motion
-   React Router
-   React Hot Toast

### Backend

-   Java 21
-   Spring Boot
-   Spring Security
-   OAuth2 Client
-   Spring Data JPA
-   PostgreSQL
-   Spotify Web API
-   Spotify Web Playback SDK integration
-   Swagger / OpenAPI
-   Maven

### Infrastructure

-   Vercel --- frontend
-   Railway --- backend
-   Supabase --- PostgreSQL
-   Docker / Docker Compose --- local development and containerized
    backend

## Architecture

``` text
                         Spotify Accounts
                                |
                                | OAuth 2.0
                                v
+----------------+      HTTPS      +--------------------+
| React / Vite   | <-------------> | Spring Boot API    |
| Frontend       |                 | Modular Monolith   |
+----------------+                 +---------+----------+
                                             |
                            +----------------+----------------+
                            |                                 |
                            v                                 v
                    PostgreSQL / Supabase              Spotify Web API
                    application data                  profile, music,
                                                     playlists, playback
```

The backend is a **modular monolith** organized around business domains
such as authentication, users, discovery, swipes, likes, playlists,
insights, onboarding, achievements, and access requests.

## Core User Journey

``` text
Landing Page
    |
Spotify Login
    |
Analyze Spotify Taste
    |
    +-- enough data --> Discovery Profile
    |
    +-- little/no data --> Pick 3 Genres
    |
Adventure Mode
    |
Discover / Swipe
    |
Likes --> Create Spotify Playlist
    |
Insights / Journeys / Achievements / Profile
```

## Spotify Free vs Premium

Spotinder itself does **not** require Spotify Premium.

-   **Premium:** tracks can play directly inside Spotinder through
    Spotify's Web Playback SDK.
-   **Free:** discovery, swiping, likes, playlists, insights, and the
    rest of Spotinder remain available; pressing play opens the exact
    track in Spotify.

## Local Development

### Prerequisites

-   Java 21
-   Maven
-   Node.js / npm
-   PostgreSQL
-   Spotify Developer application

### Backend

Set the required environment variables:

``` env
DB_URL=jdbc:postgresql://localhost:5433/spotinder
DB_USERNAME=postgres
DB_PASSWORD=postgres

SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REDIRECT_URI=http://localhost:8080/login/oauth2/code/spotify

FRONTEND_URL=http://127.0.0.1:5173
```

Then run:

``` bash
cd backend
./mvnw spring-boot:run
```

### Frontend

Create the frontend environment file from `.env.example`, then run:

``` bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend URLs through the Vite environment
variables defined by the project.

## Repository Structure

``` text
Spotinder/
├── backend/
│   └── src/main/java/com/spotinder/backend/
│       ├── access/
│       ├── achievements/
│       ├── auth/
│       ├── common/
│       ├── discovery/
│       ├── insights/
│       ├── likes/
│       ├── onboarding/
│       ├── playlists/
│       ├── spotify/
│       ├── swipes/
│       └── users/
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── features/
│       ├── pages/
│       └── services/
├── docs/
└── docker-compose.yml
```

## Documentation

  -------------------------------------------------------------------------------
  Document                                    Description
  ------------------------------------------- -----------------------------------
  [Product](docs/01-product.md)               Vision, product principles,
                                              features and scope

  [User Journey](docs/02-user-journey.md)     End-to-end user experience

  [Architecture](docs/03-architecture.md)     Current technical architecture

  [Database](docs/04-database.md)             Persistence model and data
                                              ownership

  [API](docs/05-api.md)                       Current REST API surface

  [Backlog / Status](docs/06-backlog.md)      Completed work and remaining polish

  [Technical Decisions](docs/07-decisions.md) Important engineering decisions

  [Recommendation                             Detailed discovery algorithm
  Engine](docs/08-recommendation-engine.md)   

  [Deployment](docs/09-deployment.md)         Production topology and deployment
                                              notes
  -------------------------------------------------------------------------------

## Development Status

The core MVP is complete and deployed. The remaining planned work is
primarily responsive/mobile UI polishing and final cross-device QA.

## Author

**Salaheddine Rouchdi**\
Backend & Cloud Engineer

GitHub: `SalahRch`

------------------------------------------------------------------------

Spotinder is an independent project using Spotify APIs and is not
affiliated with or endorsed by Spotify.
