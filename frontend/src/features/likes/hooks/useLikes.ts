import { useQuery } from "@tanstack/react-query";

import { getLikedSongs } from "../api/likes";

export function useLikes() {
    return useQuery({
        queryKey: ["likes"],
        queryFn: getLikedSongs,
    });
}