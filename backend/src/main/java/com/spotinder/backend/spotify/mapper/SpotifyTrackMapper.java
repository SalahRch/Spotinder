package com.spotinder.backend.spotify.mapper;

import com.spotinder.backend.discovery.dto.SongResponse;
import com.spotinder.backend.spotify.dto.SpotifyTrackResponse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SpotifyTrackMapper {

    SongResponse toSongResponse(SpotifyTrackResponse track);

    List<SongResponse> toSongResponses(List<SpotifyTrackResponse> tracks);

}