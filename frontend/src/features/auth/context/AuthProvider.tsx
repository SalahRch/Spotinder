import { useMemo, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "./AuthContext";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { authService } from "../services/auth";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
    } = useCurrentUser();

    const refresh = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["current-user"],
        });
    };

    const logout = async () => {
        await authService.logout();

        queryClient.setQueryData(["current-user"], undefined);
        await queryClient.invalidateQueries({
            queryKey: ["current-user"],
        });
    };

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            isLoading,
            login: authService.login,
            logout,
            refresh,
        }),
        [user, isLoading],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}