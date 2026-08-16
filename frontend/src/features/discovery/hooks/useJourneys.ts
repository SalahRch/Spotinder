import { useQuery } from "@tanstack/react-query";

import { discoveryService } from "../services/discovery";

export function useJourneys() {
    return useQuery({
        queryKey: ["journeys"],
        queryFn:
        discoveryService.getJourneys,
        staleTime: 5 * 60 * 1000,
    });
}