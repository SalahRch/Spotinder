# REST API

Base path for application endpoints:

``` text
/api/v1
```

Authentication itself is initiated through Spring Security's Spotify
OAuth2 authorization route.

## Access

  Method   Endpoint                          Purpose
  -------- --------------------------------- --------------------------------
  POST     `/api/v1/access-requests`         Submit an early-access request
  GET      `/api/v1/access-requests/count`   Read access-request count

## Users

  ----------------------------------------------------------------------------------------
  Method                  Endpoint                                 Purpose
  ----------------------- ---------------------------------------- -----------------------
  POST                    `/api/v1/users`                          User operation exposed
                                                                   by the current
                                                                   controller

  GET                     `/api/v1/users/me`                       Current authenticated
                                                                   user

  PATCH                   `/api/v1/users/me/preferences`           Update discovery
                                                                   preferences

  PATCH                   `/api/v1/users/me/genres`                Save selected
                                                                   onboarding genres

  POST                    `/api/v1/users/me/onboarding/complete`   Mark onboarding
                                                                   complete
  ----------------------------------------------------------------------------------------

## Onboarding

  ------------------------------------------------------------------------------
  Method                  Endpoint                       Purpose
  ----------------------- ------------------------------ -----------------------
  GET                     `/api/v1/onboarding/profile`   Build
                                                         onboarding/discovery
                                                         profile

  ------------------------------------------------------------------------------

## Discovery

  Method   Endpoint                         Purpose
  -------- -------------------------------- -----------------------------
  GET      `/api/v1/discover`               Generate the discovery deck
  GET      `/api/v1/discover/daily`         Daily discovery
  GET      `/api/v1/discover/daily/recap`   Daily discovery recap

## Journeys

  Method   Endpoint                         Purpose
  -------- -------------------------------- -------------------------
  GET      `/api/v1/journeys`               List discovery journeys
  GET      `/api/v1/journeys/{journeyId}`   Journey details

## Swipes

  Method   Endpoint           Purpose
  -------- ------------------ ---------------------
  POST     `/api/v1/swipes`   Persist Like / Pass

## Likes

  Method   Endpoint          Purpose
  -------- ----------------- -----------------------
  GET      `/api/v1/likes`   Retrieve liked tracks

## Playlists

  -----------------------------------------------------------------------
  Method                  Endpoint                Purpose
  ----------------------- ----------------------- -----------------------
  POST                    `/api/v1/playlists`     Create a Spotify
                                                  playlist from Spotinder

  -----------------------------------------------------------------------

## Insights

  Method   Endpoint             Purpose
  -------- -------------------- ---------------------------------------
  GET      `/api/v1/insights`   Retrieve discovery/listening insights

## Achievements

  Method   Endpoint                 Purpose
  -------- ------------------------ ----------------------------
  GET      `/api/v1/achievements`   Retrieve achievement state

## Spotify Integration

  ----------------------------------------------------------------------------------
  Method                  Endpoint                           Purpose
  ----------------------- ---------------------------------- -----------------------
  GET                     `/api/v1/spotify/playback-token`   Token used by
                                                             integrated playback

  POST                    `/api/v1/spotify/play`             Start a track on the
                                                             Spotinder Spotify
                                                             device

  GET                     `/api/v1/spotify/top-artists`      Spotify top artists

  GET                     `/api/v1/spotify/search-artists`   Artist search
  ----------------------------------------------------------------------------------

## Authentication Notes

The frontend uses a credentialed session with the backend. Spotify OAuth
is handled by Spring Security rather than by a custom
`/api/v1/auth/login` endpoint.

Production cross-site session cookies are configured as secure,
HTTP-only, and `SameSite=None`.
