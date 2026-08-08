import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { swipeService } from "../services/swipe";

export function useRecordSwipe() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn:
        swipeService.recordSwipe,

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["likes"],
                }),

                queryClient.invalidateQueries({
                    queryKey: ["insights"],
                }),
            ]);
        },
    });
}