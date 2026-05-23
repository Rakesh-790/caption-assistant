import type { LoginRequest, RegisterRequest } from "../types/auth.type";
import axiosInstance from "../api/axiosinstance.api";

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

export const getCurrentUser = async () => {
    const response = await axiosInstance.get("/users/me");

    return response.data;
};

export const logoutUser = async () =>{
    await axiosInstance.post("/api/auth/logout")
}