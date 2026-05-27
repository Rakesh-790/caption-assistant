import { create } from "zustand";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../../service/authService";

type User = {
    email: string;
};

type AuthState = {
    user: User | null;

    isAuthenticated: boolean;

    isLoading: boolean;

    checkAuth: () => Promise<void>;

    setAuth: (user: User) => void;

    login: (data: any) => Promise<void>;

    register: (data: any) => Promise<void>;

    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    isAuthenticated: false,

    isLoading: true,

    setAuth: (user) => {
        set({
            user,
            isAuthenticated: true,
        });
    },

    login: async (data) => {

        try {
    
            const response = await loginUser(data);
    
            set({
                user: response.data,
                isAuthenticated: true,
            });
    
        } catch (error) {
    
            throw error;
        }
    },

    register: async (data) => {

        try {
    
            const response = await registerUser(data);
    
            set({
                user: response.data,
                isAuthenticated: true,
            });
    
        } catch (error) {
    
            throw error;
        }
    },

    checkAuth: async () => {
        try {
            const user = await getCurrentUser();
            set({
                user,
                isAuthenticated: true
            })
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false
            });
        } finally {
            set({
                isLoading: false
            })
        }
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