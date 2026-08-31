import { useQuery } from "@tanstack/react-query";
import { getAccessRequestCount } from "../services/access";

export function useAccessRequestCount() {
    return useQuery({
        queryKey: ["access-request-count"],
        queryFn: getAccessRequestCount,
        staleTime: 60 * 1000,
        retry: false,
    });
}