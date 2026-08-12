import { useQuery } from "@tanstack/react-query";

import { discoveryService } from "../services/discovery";

export function useDailyDiscovery() {
    return useQuery({
        queryKey: ["daily-discovery"],
        queryFn:
        discoveryService.getDailyDiscovery,

        retry: 1,

        /*
         * Daily progress can change after
         * every successful swipe, so we
         * explicitly invalidate this query
         * from useRecordSwipe.
         */
        staleTime: Infinity,
    });
}