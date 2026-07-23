# 📄 API Design

# Spotinder

This document defines the REST API exposed by Spotinder.

The API is designed around the user journey rather than CRUD operations.

---

# 🌐 Base URL

```
/api/v1
```

---

# 🎯 API Principles

The API follows these principles:

- RESTful endpoints
- Resource-oriented design
- JSON communication
- Stateless authentication
- Consistent response format
- Clear error messages

---

# 🔐 Authentication

Authentication is handled through Spotify OAuth 2.0.

The frontend authenticates the user using Spotify.

The backend exchanges the authorization code for Spotify access and refresh tokens.

After successful authentication, Spotinder creates its own authenticated session.

---

# 📚 Endpoints

---

# Authentication

## Login

```http
GET /auth/login
```

Redirects the user to Spotify's OAuth page.

---

## Callback

```http
GET /auth/callback
```

Receives Spotify's authorization code and creates a user session.

---

## Logout

```http
POST /auth/logout
```

Terminates the current session.

---

# User

## Current User

```http
GET /me
```

Returns the authenticated user.

Example Response

```json
{
  "displayName": "John Doe",
  "country": "MA",
  "adventureLevel": 70,
  "blindModeDefault": false
}
```

---

## Update Preferences

```http
PATCH /me/preferences
```

Updates:

- Adventure Mode
- Blind Mode

---

# Discovery

## Get Recommendations

```http
GET /discover
```

Returns the next batch of recommended songs.

Optional query parameters:

```text
limit=20

blind=true
```

Example Response

```json
[
  {
    "spotifyTrackId": "...",
    "title": "...",
    "artist": "...",
    "albumImage": "..."
  }
]
```

---

# Swipes

## Like / Pass Song

```http
POST /swipes
```

Example Request

```json
{
  "spotifyTrackId": "...",
  "direction": "LIKE"
}
```

Possible values:

- LIKE
- PASS

---

## Swipe History

```http
GET /swipes
```

Returns the user's swipe history.

---

# Playlists

## Generate Playlist

```http
POST /playlists
```

Creates a Spotify playlist from liked songs.

Example Request

```json
{
  "name": "Late Night Vibes"
}
```

---

## User Playlists

```http
GET /playlists
```

Returns playlists generated through Spotinder.

---

# Insights

## Listening Insights

```http
GET /insights
```

Returns analytics for the authenticated user.

Example Response

```json
{
  "songsLiked": 241,
  "songsPassed": 93,
  "favoriteGenre": "Alternative Rock",
  "favoriteArtist": "Arctic Monkeys",
  "discoveryScore": 82
}
```

---

# Sessions

## Discovery Sessions

```http
GET /sessions
```

Returns previous discovery sessions.

---

# Health

```http
GET /health
```

Returns application health status.

---

# Response Format

Successful responses:

```json
{
  "data": {}
}
```

Collections:

```json
{
  "data": []
}
```

Errors:

```json
{
  "timestamp": "...",
  "status": 404,
  "error": "Not Found",
  "message": "...",
  "path": "/..."
}
```

---

# HTTP Status Codes

| Status | Meaning |
|---------|----------|
| 200 | Success |
| 201 | Resource Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# API Versioning

The API is versioned through the URL.

Example

```
/api/v1
```

Future versions may introduce:

```
/api/v2
```

without breaking existing clients.

---

# Future Endpoints

These endpoints are planned for later releases:

```http
GET /discover/daily

POST /playlists/ai

POST /chat

GET /achievements

GET /stats

GET /friends
```

---

# 💡 Design Philosophy

The API exists to power the user experience.

Endpoints are designed around user actions rather than direct database operations.