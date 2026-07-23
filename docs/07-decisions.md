# Decisions

## Authentication

Spotify OAuth only.

Reason:
Users already have Spotify accounts.

---

## Architecture

Modular Monolith.

Reason:
Faster MVP.

---

## Database

UUID primary keys.

Reason:
Safer and easier future scaling.

---

## Music Metadata

Spotify is the source of truth.

Reason:
Avoid data duplication.

---

## AI

Separate service in the future.

Reason:
Independent evolution.