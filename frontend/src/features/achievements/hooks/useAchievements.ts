import {
    useQuery,
} from "@tanstack/react-query";

import {
    achievementService,
} from "../services/achievements";

export function useAchievements() {
    return useQuery({
        queryKey: ["achievements"],
        queryFn:
        achievementService.getAchievements,
        staleTime: 60_000,
    });
}