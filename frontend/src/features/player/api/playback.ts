import api from "@/services/api";

type PlaybackTokenResponse = {
    accessToken: string;
};

type PlayTrackRequest = {
    deviceId: string;
    spotifyTrackId: string;
};

export async function getSpotifyPlaybackToken() {
    const { data } =
        await api.get<PlaybackTokenResponse>(
            "/spotify/playback-token",
        );

    return data.accessToken;
}

export async function playSpotifyTrack(
    request: PlayTrackRequest,
) {
    await api.post(
        "/spotify/play",
        request,
    );
}