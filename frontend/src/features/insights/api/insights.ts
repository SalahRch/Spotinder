import api from "@/services/api";

import type {
    Insights,
} from "../types/insights";

export async function getInsights() {
    const { data } =
        await api.get<Insights>(
            "/insights",
        );

    return data;
}