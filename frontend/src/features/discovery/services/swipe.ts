import api from "@/services/api";

import type {
    SwipeRequest,
    SwipeResponse,
} from "../types/swipe";

export const swipeService = {
    async recordSwipe(
        request: SwipeRequest,
    ): Promise<SwipeResponse> {
        const { data } = await api.post<SwipeResponse>(
            "/swipes",
            request,
        );

        return data;
    },
};