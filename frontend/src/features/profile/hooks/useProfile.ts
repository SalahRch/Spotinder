import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getProfile,
    updatePreferences,
} from "../api/profile";

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });
}
export function useUpdatePreferences() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: updatePreferences,

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["profile"],
                }),

                queryClient.invalidateQueries({
                    queryKey: ["current-user"],
                }),

                queryClient.invalidateQueries({
                    queryKey: ["recommendations"],
                }),
            ]);
        },
    });
}