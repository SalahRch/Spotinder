package com.spotinder.backend.discovery.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "discovery_sessions")
public class DiscoverySession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String userId;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant startedAt;

    private Instant endedAt;

    @Column(nullable = false)
    private Integer songsSeen = 0;

    @Column(nullable = false)
    private Integer songsLiked = 0;

    @Column(nullable = false)
    private boolean blindMode;

    @Column(nullable = false)
    private Integer adventureLevel;

    public DiscoverySession() {
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

    public Instant getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Instant startedAt) {
        this.startedAt = startedAt;
    }

    public Instant getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(Instant endedAt) {
        this.endedAt = endedAt;
    }

    public Integer getSongsSeen() {
        return songsSeen;
    }

    public void setSongsSeen(Integer songsSeen) {
        this.songsSeen = songsSeen;
    }

    public Integer getSongsLiked() {
        return songsLiked;
    }

    public void setSongsLiked(Integer songsLiked) {
        this.songsLiked = songsLiked;
    }

    public boolean isBlindMode() {
        return blindMode;
    }

    public void setBlindMode(boolean blindMode) {
        this.blindMode = blindMode;
    }

    public Integer getAdventureLevel() {
        return adventureLevel;
    }

    public void setAdventureLevel(Integer adventureLevel) {
        this.adventureLevel = adventureLevel;
    }
}