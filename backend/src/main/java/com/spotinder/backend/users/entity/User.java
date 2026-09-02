package com.spotinder.backend.users.entity;

import java.util.LinkedHashSet;
import java.util.Set;
import com.spotinder.backend.common.enums.SpotifyProduct;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "spotifyId"),
                @UniqueConstraint(columnNames = "email")
        }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String spotifyId;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false)
    private String email;

    @Column
    private String avatarUrl;

    @Column(nullable = false)
    private String country;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SpotifyProduct product;

    @Column(nullable = false)
    private Integer adventureLevel = 50;

    @Column(nullable = false)
    private boolean blindModeDefault = false;

    @Column(nullable = false)
    private boolean onboardingCompleted = false;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "user_selected_genres",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Column(name = "genre", nullable = false)
    private Set<String> selectedGenres =
            new LinkedHashSet<>();

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public User() {

    }

    public boolean isOnboardingCompleted() {
        return onboardingCompleted;
    }

    public void setOnboardingCompleted(boolean onboardingCompleted) {
        this.onboardingCompleted = onboardingCompleted;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getSpotifyId() {
        return spotifyId;
    }

    public void setSpotifyId(String spotifyId) {
        this.spotifyId = spotifyId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public SpotifyProduct getProduct() {
        return product;
    }

    public void setProduct(SpotifyProduct product) {
        this.product = product;
    }

    public Integer getAdventureLevel() {
        return adventureLevel;
    }

    public void setAdventureLevel(Integer adventureLevel) {
        this.adventureLevel = adventureLevel;
    }

    public boolean isBlindModeDefault() {
        return blindModeDefault;
    }

    public void setBlindModeDefault(boolean blindModeDefault) {
        this.blindModeDefault = blindModeDefault;
    }

    public Set<String> getSelectedGenres() {
        return selectedGenres;
    }

    public void setSelectedGenres(Set<String> selectedGenres) {
        this.selectedGenres = selectedGenres;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}