import type React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props{
    children: React.ReactNode;
}

function ProtectedRoute({children} : Props) {
    const {user, loading} = useAuth();

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return children;

}

export default ProtectedRoute;