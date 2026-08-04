import { createContext } from "react";
import type { User } from "../types/user";

export type AuthContextValue = {
    user: User | undefined;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);