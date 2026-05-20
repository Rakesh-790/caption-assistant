import React, { createContext, useContext, useEffect, useState } from "react";
import type { LoginRequest, RegisterRequest, User } from "../types/auth.type";
import { getUser, loginUser, registerUser } from "../service/authService";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode })=> {
    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const data = await getUser();
            setUser(data);
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: LoginRequest) => {
        await loginUser(data);
        const userData = await getUser();
        setUser(userData);
    };

    const register = async (data: RegisterRequest) => {
        await registerUser(data);
    };

    return(
        <AuthContext.Provider value={{ user, loading, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}