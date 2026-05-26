export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface User {
    email: string;
    role: string;
    createdAt: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}