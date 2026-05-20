import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import GenerateCaptionPage from "../pages/dashboard/GenerateCaptionPage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import CreateCaptionPage from "../pages/dashboard/CreateCaptionPage";

function AppRoutes() {
    return (
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route element={<DashboardLayout />}>

                    <Route path="/" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } />

                    <Route 
                        path="create" 
                        element={<CreateCaptionPage/>}
                    />
 
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