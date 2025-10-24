import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import APIResponse from "../classes/APIResponse";
// import { authService } from "../api/authService";
import Spinner from "@/components/feature/Spinner";

type RouteGuardProps = {
    children: React.ReactNode;
    isAuthPage?: boolean;
};

const RouteGuard: React.FC<RouteGuardProps> = ({
    children,
    isAuthPage = false,
}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const user = localStorage.getItem("user");
            console.log("Auth check - User:", user, "isAuthPage:", isAuthPage);

            if (!user) {
                if (!isAuthPage) {
                    console.log("No user found, redirecting to login");
                    navigate("/login", { replace: true });
                }
                setIsLoading(false);
                return;
            }

            // If user exists and it's an auth page, redirect to home
            if (isAuthPage && user) {
                navigate("/", { replace: true });
                setIsLoading(false);
                return;
            }

            try {
                // const response: APIResponse<string> = await authService.authenticate();
                // if (response.code === APIResponse.SUCCESS) {

                // @TODO: Remove this temporary authentication
                setIsAuthenticated(true);
                //} else {
                //    setIsAuthenticated(false);
                //}
            } catch (error) {
                console.error("Auth check failed:", error);
                if (!isAuthPage) {
                    navigate("/login", { replace: true });
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [isAuthPage]);  // Only depend on isAuthPage to prevent unnecessary re-runs

    if (isLoading) {
        return <Spinner />;
    }

    // Only render children if authenticated or it's an auth page
    if (!isAuthPage && !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default RouteGuard;
