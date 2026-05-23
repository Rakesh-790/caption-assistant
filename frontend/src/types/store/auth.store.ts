import { create } from "zustand";
import { logoutUser } from "../../service/authService";

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

    logout: async () => {

        try {

            await logoutUser();

        } catch (error) {

            console.error(error);

        } finally {

            set({
                user: null,
                isAuthenticated: false,
            });
        }
    },
}));