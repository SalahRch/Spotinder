import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: authService.getCurrentUser,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}