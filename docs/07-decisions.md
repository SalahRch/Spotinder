# Technical Decisions

## Spotify OAuth instead of local credentials

**Decision:** Users authenticate with Spotify.

**Why:** Spotify identity is already required for the product, so
maintaining a second password system would add friction and security
responsibility without improving the core experience.

## Modular monolith

**Decision:** Keep backend domains in one Spring Boot deployment while
separating them by package/module.

**Why:** It provides clean domain boundaries without unnecessary
microservice infrastructure for an MVP.

## PostgreSQL for application state

**Decision:** Persist Spotinder-owned data in PostgreSQL.

**Why:** The domain is relational, the data model is straightforward,
and PostgreSQL is well suited for users, swipes, sessions, playlists,
achievements, and access requests.

## Spotify as catalog source of truth

**Decision:** Do not build a local mirror of Spotify's catalog.

**Why:** Spotinder is a discovery layer. Spotify already owns artist,
album, track, playlist, and playback data.

## Adventure Mode controls exploration, not a simple score bonus

**Decision:** Adventure level changes the mix of genre territories
included in the exploration plan.

**Why:** This gives the control meaningful semantics: low Adventure
stays closer to established taste, while high Adventure deliberately
spends more recommendation capacity on nearby/frontier territory.

## Combine Spotify taste with Spotinder behavior

**Decision:** Initial taste comes from Spotify; ongoing discovery
behavior contributes additional artist/genre affinity.

**Why:** Spotify solves the cold-start problem for established accounts,
while Spotinder's Like/Pass data reflects what the user wants to
discover inside this product.

## Fresh-account genre bootstrap

**Decision:** When Spotify cannot provide sufficient taste data, ask the
user for three genres.

**Why:** A brand-new Spotify account should still be able to use
Spotinder. The selected genres seed the same recommendation architecture
rather than creating a separate recommendation system.

## Premium / Free playback split

**Decision:** Premium users get integrated playback; Free users open the
exact track in Spotify.

**Why:** Spotify's Web Playback SDK and playback APIs have Premium
requirements. Spotinder's discovery functionality should not require
Premium.

## Do not initialize Web Playback SDK for Free accounts

**Decision:** Gate SDK initialization by Spotify product.

**Why:** It avoids expected account errors, unnecessary token/device
work, and misleading in-app playback state.

## Managed production services

**Decision:** Vercel for frontend, Railway for backend, Supabase for
PostgreSQL.

**Why:** This keeps deployment simple and appropriate for a
portfolio/MVP application while preserving a real production topology.
