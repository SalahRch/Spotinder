
import {
    useMutation,
} from "@tanstack/react-query";

import {
    onboardingService,
} from "../services/onboarding";

export function useSaveGenres() {
    return useMutation({
        mutationFn: (
            genres: string[],
        ) =>
            onboardingService.saveGenres(
                genres,
            ),
    });
}