# Deployment

## Production Topology

``` text
Browser
  |
  v
Vercel
React/Vite frontend
  |
  | HTTPS + credentialed requests
  v
Railway
Spring Boot backend
  |
  +------------------> Spotify OAuth / Web API
  |
  v
Supabase
PostgreSQL
```

## Frontend

The frontend is deployed on Vercel as a Vite SPA.

The repository includes `vercel.json` for SPA routing behavior.

## Backend

The Spring Boot backend is deployed on Railway and can also be built as
a Docker container.

Important runtime configuration includes: - database URL /
credentials; - Spotify client ID and secret; - Spotify OAuth redirect
URI; - frontend origin; - platform-provided server port.

## Database

Production PostgreSQL is hosted on Supabase.

Hibernate is currently configured with:

``` properties
spring.jpa.hibernate.ddl-auto=update
```

For a larger production system, schema migrations (for example Flyway or
Liquibase) would be a natural hardening step.

## Session / Cookie Configuration

The frontend and backend are hosted on separate origins. The backend
therefore configures its session cookie as: - Secure; - HTTP-only; -
`SameSite=None`.

The frontend API client sends credentials with requests.

## Spotify Development Mode

During the current Development Mode phase, Spotify limits which accounts
can authenticate with the application.

Spotinder therefore includes an early-access request flow. Approval in
the Spotinder database is bookkeeping; the developer still manually adds
approved Spotify accounts in the Spotify Developer Dashboard.

This restriction is external to Spotinder's application authorization
logic.

## Playback

Premium accounts use the Web Playback SDK and Spotify playback API.

Free accounts skip SDK initialization and open the exact Spotify track
externally, avoiding Premium-only playback errors while preserving all
non-playback Spotinder functionality.
