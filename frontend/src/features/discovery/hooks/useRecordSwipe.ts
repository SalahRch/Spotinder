import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    swipeService,
} from "../services/swipe";

import type {
    SwipeResponse,
} from "../types/swipe";

type UseRecordSwipeOptions = {
    onAchievementsUnlocked?: (
        achievements:
        SwipeResponse["unlockedAchievements"],
    ) => void;
};

export function useRecordSwipe(
    options?: UseRecordSwipeOptions,
) {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn:
        swipeService.recordSwipe,

        onSuccess: async (response) => {
            options?.onAchievementsUnlocked?.(
                response.unlockedAchievements ??
                [],
            );

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["likes"],
                }),

                queryClient.invalidateQueries({
                    queryKey: ["insights"],
                }),

                queryClient.invalidateQueries({
                    queryKey: ["daily-discovery"],
                }),

                queryClient.invalidateQueries({
                    queryKey: ["journeys"],
                }),

                queryClient.invalidateQueries({
                    queryKey: ["daily-discovery-recap"],
                }),
            ]);
        },
    });
}