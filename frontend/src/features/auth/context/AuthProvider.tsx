import {
    useCallback,
    useMemo,
    useState,
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

    const [signedOut, setSignedOut] =
        useState(false);

    const {
        data: user,
        isLoading,
    } = useCurrentUser();

    const refresh = useCallback(async () => {
        setSignedOut(false);

        await queryClient.invalidateQueries({
            queryKey: ["current-user"],
        });
    }, [queryClient]);

    const logout = useCallback(async () => {
        await authService.logout();

        setSignedOut(true);

        await queryClient.cancelQueries({
            queryKey: ["current-user"],
        });

        queryClient.removeQueries({
            queryKey: ["current-user"],
        });
    }, [queryClient]);

    const effectiveUser =
        signedOut ? undefined : user;

    const value = useMemo(
        () => ({
            user: effectiveUser,
            isAuthenticated:
                Boolean(effectiveUser),
            isLoading:
                !signedOut && isLoading,
            login: authService.login,
            logout,
            refresh,
        }),
        [
            effectiveUser,
            signedOut,
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