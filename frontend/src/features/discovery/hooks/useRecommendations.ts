import { useQuery } from "@tanstack/react-query";

import { discoveryService } from "../services/discovery";

export function useRecommendations() {
    return useQuery({
        queryKey: ["recommendations"],
        queryFn:
        discoveryService.getRecommendations,

        retry: 1,

        /*
         * Keep the same discovery batch
         * while navigating around the app.
         */
        staleTime: Infinity,

        /*
         * Don't throw the batch away
         * after Discover unmounts.
         */
        gcTime: Infinity,

        /*
         * Navigation back to Discover
         * should not silently generate
         * a new recommendation batch.
         */
        refetchOnMount: false,

        /*
         * Don't replace the deck just
         * because the browser regained focus.
         */
        refetchOnWindowFocus: false,
    });
}