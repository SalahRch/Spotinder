import { useMutation } from "@tanstack/react-query";

import { createPlaylist } from "../api/playlists";

export function useCreatePlaylist() {
    return useMutation({
        mutationFn: createPlaylist,
    });
}