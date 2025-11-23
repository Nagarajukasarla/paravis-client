import BaseService from "./baseService";
import { API_ROUTES } from "../constants/apiRoutes";
import APIResponse from "../classes/APIResponse";
import type { AppResponse, Preferences, User } from "@/types/api";

class UserService extends BaseService {
    /**
     * Gets the partial user details.
     * @returns A promise that resolves to an `APIResponse` containing a `PartialUser` object.
     */
    async getProfile(): Promise<APIResponse<AppResponse<User>>> {
        return this.get<AppResponse<User>>(API_ROUTES.PROFILE);
    }
    
    /**
     * Gets the user details.
     * @param id The user's ID.
     * @returns A promise that resolves to an `APIResponse` containing a `User` object.
     */
    async getUser(): Promise<APIResponse<User>> {
        return this.get<User>(API_ROUTES.PROFILE);
    }

    async getPreferences(): Promise<APIResponse<AppResponse<Preferences>>> {
        return this.get<AppResponse<Preferences>>(API_ROUTES.PREFERENCES);
    }
}

export const userService = new UserService();
