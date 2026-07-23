package com.spotinder.backend.discovery.provider;

import com.spotinder.backend.discovery.dto.SongResponse;

import java.util.List;

public interface SongRecommendationProvider {

    List<SongResponse> getRecommendations();
}
