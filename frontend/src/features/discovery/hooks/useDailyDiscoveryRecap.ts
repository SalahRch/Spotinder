import { useQuery } from "@tanstack/react-query";

import { discoveryService } from "../services/discovery";

export function useDailyDiscoveryRecap(
    enabled: boolean,
) {
    return useQuery({
        queryKey: ["daily-discovery-recap"],
        queryFn:
        discoveryService.getDailyRecap,
        enabled,
        staleTime: Infinity,
    });
}