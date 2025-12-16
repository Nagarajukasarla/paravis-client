import APIResponse from "@/classes/APIResponse";
import BaseService from "@/api/baseService";
import { API_ROUTES } from "@/constants/apiRoutes";
import type { AppResponse } from "@/types/api";

class AuthService extends BaseService {
    /**
     * Authenticates the user.
     * @returns A promise that resolves to an `APIResponse` containing a string.
     */
    async authenticate(): Promise<APIResponse<string>> {
        return this.get<string>(API_ROUTES.AUTH_EMPLOYEE);
    }

    /**
     * Logs in a user with email and password.
     * @param email The user's email address.
     * @param password The user's password.
     * @returns A promise that resolves to an `APIResponse` containing a `LiteShop` object.
     */
    async login(emailOrId: string, password: string): Promise<APIResponse<AppResponse<any>>> {
        return this.post<AppResponse<any>>(API_ROUTES.LOGIN, { emailOrId, password });
    }

    async logout(): Promise<APIResponse<any>> {
        localStorage.removeItem("user");
        return new APIResponse<any>(APIResponse.SUCCESS, "Logout successful");
    }
}

export const authService = new AuthService();