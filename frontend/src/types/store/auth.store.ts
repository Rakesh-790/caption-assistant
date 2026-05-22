import { create } from "zustand";

type User = {
    email: string;
};

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;

    setAuth: (user: User) => void;

    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    isAuthenticated: false,

    setAuth: (user) => {
        set({
            user,
            isAuthenticated: true,
        });
    },

    logout: () => {
        set({
            user: null,
            isAuthenticated: false,
        });
    },
}));