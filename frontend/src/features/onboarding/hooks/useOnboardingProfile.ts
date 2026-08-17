import {
    useQuery,
} from "@tanstack/react-query";

import {
    onboardingService,
} from "../services/onboarding";

export function useOnboardingProfile() {
    return useQuery({
        queryKey: [
            "onboarding-profile",
        ],
        queryFn:
        onboardingService.getProfile,
        staleTime: Infinity,
        retry: 1,
    });
}