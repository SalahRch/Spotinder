import { useQuery } from "@tanstack/react-query";

import {
    getInsights,
} from "../api/insights";

export function useInsights() {
    return useQuery({
        queryKey: ["insights"],
        queryFn: getInsights,
    });
}