import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { queryClient } from "@/lib/queryClient.ts";
import {AuthProvider} from "@/features/auth/context/AuthProvider.tsx";

type Props = {
    children: React.ReactNode;
};

export default function AppProviders({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>

            <AuthProvider>
            {children}

            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                }}
            />
            </AuthProvider>
        </QueryClientProvider>
    );
}