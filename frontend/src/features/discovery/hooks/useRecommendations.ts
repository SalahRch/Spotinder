import { useQuery } from "@tanstack/react-query";

import { discoveryService } from "../services/discovery";

export function useRecommendations() {
    return useQuery({
        queryKey: ["recommendations"],
        queryFn: discoveryService.getRecommendations,
        retry: 1,
        staleTime: 0,
    });
}