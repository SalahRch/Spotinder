# 📄 Architecture

# Spotinder

This document describes the high-level architecture of Spotinder, the technologies used, and the design principles that guide the implementation.

---

# 🏗️ High-Level Architecture

```text
                +----------------------+
                |      Next.js App     |
                |     (Frontend)       |
                +----------+-----------+
                           |
                      REST API (HTTPS)
                           |
                           ▼
                +----------------------+
                |    Spring Boot API   |
                |      (Backend)       |
                +----------+-----------+
                           |
              +------------+------------+
              |                         |
              ▼                         ▼
      PostgreSQL Database       Spotify Web API
                                        |
                                        ▼
                               Music Catalog
                               User Library
                               Playlists
                               Recommendations

                    (Future)

                +----------------------+
                |      AI Service       |
                |      (Python)         |
                +----------------------+
```

---

# 🎯 Architecture Goals

Spotinder is designed around the following goals:

- Keep the MVP simple and maintainable.
- Build features around business domains.
- Separate concerns between frontend and backend.
- Keep the architecture flexible for future expansion.
- Favor readability over unnecessary abstraction.

---

# 🧩 Why a Modular Monolith?

The first version of Spotinder will be implemented as a **modular monolith**.

Instead of splitting the application into multiple microservices, all business domains live inside a single Spring Boot application while remaining logically separated.

This approach provides:

- Faster development
- Easier debugging
- Simpler deployment
- Lower infrastructure complexity
- Better developer experience

As the application grows, individual modules can later be extracted into dedicated services if needed.

---

# 🖥️ Frontend Architecture

The frontend is responsible for:

- Authentication flow
- Music discovery experience
- Swipe interactions
- Playlist management
- User insights
- Application settings

### Technology Stack

- Next.js
- TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- Framer Motion

---

## Suggested Structure

```text
frontend/

app/

components/

features/

hooks/

lib/

types/

public/
```

The frontend follows a **feature-first** organization.

Reusable UI components remain independent from business logic.

---

# ⚙️ Backend Architecture

The backend exposes a REST API consumed by the frontend.

Its responsibilities include:

- Spotify authentication
- User management
- Recommendation engine
- Swipe management
- Playlist generation
- Insights calculation

### Technology Stack

- Java 21
- Spring Boot
- Spring Security
- Spring OAuth2 Client
- Spring Data JPA
- PostgreSQL
- MapStruct
- Lombok
- Swagger (OpenAPI)

---

## Backend Modules

The backend is organized around business domains.

```text
backend/

auth/

users/

spotify/

discovery/

swipes/

playlists/

insights/

common/
```

Each module contains its own:

- Controller
- Service
- Repository
- DTOs
- Entities (when applicable)

---

# 🗄️ Database

Spotinder uses PostgreSQL as its primary database.

The database stores only application-specific data.

Music metadata remains managed by Spotify.

Examples of stored data include:

- Users
- Swipe history
- User preferences
- Discovery settings
- Generated playlists
- Analytics

---

# 🎵 Spotify Integration

Spotify remains the source of truth for:

- User authentication
- User profile
- Music catalog
- Artist information
- Albums
- Playlist creation
- Audio features

Spotinder stores only the information necessary to personalize the discovery experience.

---

# 🔒 Authentication

Authentication is handled through Spotify OAuth 2.0.

The application does **not** manage passwords or local accounts.

Authentication flow:

```text
User

↓

Spotify Login

↓

Spotify Authorization

↓

Spotinder Backend

↓

JWT Session

↓

Frontend
```

---

# 🔮 Future AI Service

Artificial Intelligence will be introduced in a later phase as a separate service.

Responsibilities:

- Mood-based playlist generation
- Natural language recommendations
- Personalized discovery
- Listening habit analysis

Keeping AI isolated allows independent development without impacting the core application.

---

# 🎨 Design Principles

Every technical decision should respect these principles.

## Feature First

Organize code by business domain rather than technical layers.

---

## Simplicity First

Avoid unnecessary abstractions.

Build only what is required.

---

## Clean Separation

Frontend handles presentation.

Backend handles business logic.

Spotify handles music data.

---

## Scalability

The architecture should allow future expansion without major rewrites.

---

## User Experience First

Technical decisions should always support a better user experience.

---

# 🚀 Deployment

The application will be fully containerized using Docker.

Development environment:

```text
Frontend
        │
Backend
        │
PostgreSQL
```

Production deployment will later include:

- Docker Compose
- Reverse Proxy
- HTTPS
- CI/CD
- Cloud Hosting

---

# 📈 Future Evolution

As Spotinder grows, the architecture can evolve to include:

- AI Service
- Recommendation Service
- Analytics Service
- Notification Service
- Caching Layer (Redis)

These services are intentionally excluded from the MVP to keep the initial implementation simple.

---

# 💡 Guiding Principle

> **Build a product first. Optimize the architecture second.**

The architecture should serve the product—not the other way around.