import APIResponse from "@/classes/APIResponse";
import BaseService from "@/api/baseService";
import { API_ROUTES } from "@/constants/apiRoutes";

class AuthService extends BaseService {
    /**
     * Authenticates the user.
     * @returns A promise that resolves to an `APIResponse` containing a string.
     */
    async authenticate(): Promise<APIResponse<string>> {
        return this.get<string>(API_ROUTES.AUTH);
    }

    /**
     * Logs in a user with email and password.
     * @param email The user's email address.
     * @param password The user's password.
     * @returns A promise that resolves to an `APIResponse` containing a `LiteShop` object.
     */
    async login(email: string, password: string): Promise<APIResponse<any>> {
        // return this.post<any>(API_ROUTES.LOGIN, { email, password });
        console.log("Login attempt with: ", email, password);
        // Temporarly set user in local storage
        localStorage.setItem("user", JSON.stringify({ email, password }));
        return new APIResponse<any>(APIResponse.SUCCESS, "Login successful");
    }

    async logout(): Promise<APIResponse<any>> {
        localStorage.removeItem("user");
        return new APIResponse<any>(APIResponse.SUCCESS, "Logout successful");
    }
}

export const authService = new AuthService();