import api from "@/services/api";

import type { LikedSong } from "../types/likes";

export async function getLikedSongs() {
    const { data } =
        await api.get<LikedSong[]>(
            "/likes",
        );

    return data;
}