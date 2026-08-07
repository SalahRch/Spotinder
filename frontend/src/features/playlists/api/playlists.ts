import api from "@/services/api";

import type {
    CreatePlaylistRequest,
    PlaylistResponse,
} from "../types/playlists";

export async function createPlaylist(
    request: CreatePlaylistRequest,
) {
    const { data } =
        await api.post<PlaylistResponse>(
            "/playlists",
            request,
        );

    return data;
}