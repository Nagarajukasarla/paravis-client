
import { authService } from "@/api/authService";
import APIResponse from "@/classes/APIResponse";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await authService.authenticate();
            if (response.code === APIResponse.SUCCESS) {
                setIsAuthorized(true);
            } 
            else if (response.code === APIResponse.NO_INTERNET) {
                alert(response.description);
            }
            else if (response.code === APIResponse.SERVER_DOWN) {
                alert(response.description);
            }
            else if (response.code === APIResponse.UNAUTHORIZED) {
                setIsAuthorized(false);
            }
        } 
        catch (error) {
            console.error("Authentication error:", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return { isAuthorized, loading };
};

export default useAuth;
