import BaseService from "./baseService";
import { API_ROUTES } from "../constants/apiRoutes";
import APIResponse from "../classes/APIResponse";

class UserService extends BaseService {
    /**
     * Gets the partial user details.
     * @returns A promise that resolves to an `APIResponse` containing a `PartialUser` object.
     */
    async getPartialUser(): Promise<APIResponse<PartialUser>> {
        return this.get<PartialUser>(API_ROUTES.PARTIAL_USER);
    }
    
    /**
     * Gets the user details.
     * @param id The user's ID.
     * @returns A promise that resolves to an `APIResponse` containing a `User` object.
     */
    async getUser(id: string): Promise<APIResponse<User>> {
        const user:User = {
            id:"EMP12345",
            name:"Nagaraju Kasarla",
            shiftTimings:["09:00 AM", "06:00 PM"],
            leaves:["2025-10-21","2025-10-19","2025-10-20"],
            presentDays:["2025-10-01","2025-10-02", "2025-10-03", "2025-10-04", "2025-10-05", "2025-10-06", "2025-10-07"],
            holidays:["2025-10-08","2025-10-09"],
        }

        // return this.get<User>(API_ROUTES.USER+`/${id}`);

        return Promise.resolve(new APIResponse<User>(APIResponse.SUCCESS, user));
    }
}

export const userService = new UserService();
