import Spinner from "@/components/feature/Spinner";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthorized, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Spinner />;
    }

    if (!isAuthorized) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
