import { Navigate } from "react-router-dom";
import { useAuthStore } from "../types/store/auth.store";


type Props = {
    children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {

    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;