import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();

    // Check if user exists in cookies
    const userStr = Cookies.get("user");
    console.log("===userStr: ", userStr);
    const user = userStr ? JSON.parse(userStr) : null;

    // Check authentication - verify user data exists
    const isAuthenticated = Boolean(user && (user.email || user.id));

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
