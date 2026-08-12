package com.spotinder.backend.swipes.entity;

import com.spotinder.backend.common.enums.SwipeDirection;
import com.spotinder.backend.discovery.entity.DiscoverySession;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "swipes",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"userId", "spotifyTrackId"}
                )
        }
)
public class Swipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private Integer adventureLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discovery_session_id")
    private DiscoverySession discoverySession;

    @Column(nullable = false)
    private String spotifyTrackId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SwipeDirection direction;

    @Column(nullable = false)
    private boolean blindMode;

    @CreationTimestamp
    private Instant createdAt;


    public Swipe(){

    }

    public Integer getAdventureLevel() {
        return adventureLevel;
    }

    public void setAdventureLevel(Integer adventureLevel) {
        this.adventureLevel = adventureLevel;
    }

    public DiscoverySession getDiscoverySession() {
        return discoverySession;
    }

    public void setDiscoverySession(DiscoverySession discoverySession) {
        this.discoverySession = discoverySession;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSpotifyTrackId() {
        return spotifyTrackId;
    }

    public void setSpotifyTrackId(String spotifyTrackId) {
        this.spotifyTrackId = spotifyTrackId;
    }

    public SwipeDirection getDirection() {
        return direction;
    }

    public void setDirection(SwipeDirection direction) {
        this.direction = direction;
    }

    public boolean isBlindMode() {
        return blindMode;
    }

    public void setBlindMode(boolean blindMode) {
        this.blindMode = blindMode;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
