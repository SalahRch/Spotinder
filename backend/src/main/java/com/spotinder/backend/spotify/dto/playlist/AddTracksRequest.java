package com.spotinder.backend.spotify.dto.playlist;

import java.util.List;

public record AddTracksRequest(

        List<String> uris

) {}