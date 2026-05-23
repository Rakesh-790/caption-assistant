import { Route, Routes } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardLayout from "../components/layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import GenerateCaptionPage from "../pages/dashboard/GenerateCaptionPage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>


            <Route path="/" element={
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            } />

            <Route path="/" element={<DashboardPage />}>

                <Route
                    path="/generate-caption"
                    element={<GenerateCaptionPage />}
                />

                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />

            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;