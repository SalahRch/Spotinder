import { useQuery } from "@tanstack/react-query";

import { discoveryService } from "../services/discovery";

export function useJourney(
    journeyId?: string,
) {
    return useQuery({
        queryKey: [
            "journey",
            journeyId,
        ],

        queryFn: () =>
            discoveryService.getJourney(
                journeyId!,
            ),

        enabled:
            Boolean(journeyId),

        staleTime: Infinity,
    });
}