import type { LoginRequest, RegisterRequest, User } from "../types/auth.type";
import axiosInstance from "../api/axios";

export const loginUser = async (data: LoginRequest) => {
    const response = await axiosInstance.post(
        "/api/auth/login", 
        data
    );

    return response.data;
}

export const registerUser = async (data: RegisterRequest) => {
    const response = await axiosInstance.post(
        "/api/auth/register", 
        data
    );
    
    return response.data;
}

export const getUser = async (): Promise<User> => {
    const response = await axiosInstance.get(
        "api/auth/me"
    );

    return response.data;
}