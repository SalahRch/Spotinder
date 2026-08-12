import api from "@/services/api";

import type {
    Profile,
    UpdatePreferencesRequest,
} from "../types/profile";

export async function getProfile() {
    const { data } =
        await api.get<Profile>(
            "/users/me",
        );

    return data;
}

export async function updatePreferences(
    request: UpdatePreferencesRequest,
) {
    const { data } =
        await api.patch<Profile>(
            "/users/me/preferences",
            request,
        );

    return data;
}