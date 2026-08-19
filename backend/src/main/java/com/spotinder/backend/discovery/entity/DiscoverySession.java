package com.spotinder.backend.discovery.entity;

import com.spotinder.backend.common.enums.DiscoveryPersona;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
        name = "discovery_sessions",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_discovery_session_user_date",
                        columnNames = {
                                "user_id",
                                "discovery_date"
                        }
                )
        }
)
public class DiscoverySession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(
            name = "user_id",
            nullable = false
    )
    private String userId;

    @Column(
            name = "discovery_date",
            nullable = false
    )
    private LocalDate discoveryDate;

    @CreationTimestamp
    @Column(
            name = "started_at",
            nullable = false,
            updatable = false
    )
    private Instant startedAt;

    @Column(name = "completed_at")
    private Instant completedAt;

    @Column(nullable = false)
    private Integer goal = 5;

    @Column(
            name = "songs_seen",
            nullable = false
    )
    private Integer songsSeen = 0;

    @Column(
            name = "songs_liked",
            nullable = false
    )
    private Integer songsLiked = 0;

    @Column(nullable = false)
    private boolean completed = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "discovery_persona")
    private DiscoveryPersona discoveryPersona;

    @Column(name = "journey_title")
    private String journeyTitle;

    @Column(name = "recap_message")
    private String recapMessage;

    @Column(name = "like_rate")
    private Double likeRate;

    @Column(name = "blind_explored")
    private Integer blindExplored;

    @Column(name = "blind_liked")
    private Integer blindLiked;

    @Column(name = "average_adventure_level")
    private Double averageAdventureLevel;

    public DiscoverySession() {
    }

    public DiscoveryPersona getDiscoveryPersona() {
        return discoveryPersona;
    }

    public void setDiscoveryPersona(DiscoveryPersona discoveryPersona) {
        this.discoveryPersona = discoveryPersona;
    }

    public String getJourneyTitle() {
        return journeyTitle;
    }

    public void setJourneyTitle(String journeyTitle) {
        this.journeyTitle = journeyTitle;
    }

    public String getRecapMessage() {
        return recapMessage;
    }

    public void setRecapMessage(String recapMessage) {
        this.recapMessage = recapMessage;
    }

    public Double getLikeRate() {
        return likeRate;
    }

    public void setLikeRate(Double likeRate) {
        this.likeRate = likeRate;
    }

    public Integer getBlindExplored() {
        return blindExplored;
    }

    public void setBlindExplored(Integer blindExplored) {
        this.blindExplored = blindExplored;
    }

    public Integer getBlindLiked() {
        return blindLiked;
    }

    public void setBlindLiked(Integer blindLiked) {
        this.blindLiked = blindLiked;
    }

    public Double getAverageAdventureLevel() {
        return averageAdventureLevel;
    }

    public void setAverageAdventureLevel(Double averageAdventureLevel) {
        this.averageAdventureLevel = averageAdventureLevel;
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

    public LocalDate getDiscoveryDate() {
        return discoveryDate;
    }

    public void setDiscoveryDate(
            LocalDate discoveryDate
    ) {
        this.discoveryDate = discoveryDate;
    }

    public Instant getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(
            Instant startedAt
    ) {
        this.startedAt = startedAt;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(
            Instant completedAt
    ) {
        this.completedAt = completedAt;
    }

    public Integer getGoal() {
        return goal;
    }

    public void setGoal(Integer goal) {
        this.goal = goal;
    }

    public Integer getSongsSeen() {
        return songsSeen;
    }

    public void setSongsSeen(
            Integer songsSeen
    ) {
        this.songsSeen = songsSeen;
    }

    public Integer getSongsLiked() {
        return songsLiked;
    }

    public void setSongsLiked(
            Integer songsLiked
    ) {
        this.songsLiked = songsLiked;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(
            boolean completed
    ) {
        this.completed = completed;
    }
}