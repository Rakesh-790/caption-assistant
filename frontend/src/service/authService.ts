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
        "/api/auth/signup",
        data
    );

    return response.data;
}

export const getCurrentUser = async () => {
    const response = await axiosInstance.get("/api/user/me");

    return response.data;
};

export const logoutUser = async () => {
    return axiosInstance.post("/api/auth/logout",
        {},
        {
            withCredentials: true,
        }
    );
};