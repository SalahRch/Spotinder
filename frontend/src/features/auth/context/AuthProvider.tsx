import {
    useCallback,
    useMemo,
    type ReactNode,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "./AuthContext";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { authService } from "../services/auth";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({
                                 children,
                             }: AuthProviderProps) {

    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
    } = useCurrentUser();

    const refresh = useCallback(async () => {
        await queryClient.invalidateQueries({
            queryKey: ["current-user"],
        });
    }, [queryClient]);

    const logout = useCallback(async () => {
        await authService.logout();

        queryClient.removeQueries({
            queryKey: ["current-user"],
        });
    }, [queryClient]);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            isLoading,
            login: authService.login,
            logout,
            refresh,
        }),
        [
            user,
            isLoading,
            logout,
            refresh,
        ],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}