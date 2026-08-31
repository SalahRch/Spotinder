import api from "@/services/api";

export type AccessRequestPayload = {
    email: string;
};

export type AccessRequestCount = {
    pending: number;
};

export async function requestAccess(
    payload: AccessRequestPayload,
): Promise<void> {
    await api.post("/access-requests", payload);
}

export async function getAccessRequestCount(): Promise<AccessRequestCount> {
    const response = await api.get<AccessRequestCount>(
        "/access-requests/count",
    );

    return response.data;
}