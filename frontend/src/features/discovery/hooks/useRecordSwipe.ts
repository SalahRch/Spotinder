import { useMutation } from "@tanstack/react-query";

import { swipeService } from "../services/swipe";

export function useRecordSwipe() {
    return useMutation({
        mutationFn: swipeService.recordSwipe,
    });
}