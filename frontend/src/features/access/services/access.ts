import api from "@/services/api";

export type AccessRequestPayload = {
    email: string;
};

export async function requestAccess(
    payload: AccessRequestPayload,
): Promise<void> {
    await api.post("/api/v1/access-requests", payload);
}