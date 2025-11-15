import BaseService from "@/api/baseService";
import APIResponse from "@/classes/APIResponse";
import { API_ROUTES } from "@/constants/apiRoutes";

class Attendance extends BaseService {
    /**
     * Mark attendance of the user.
     * @returns A promise that resolves to an `APIResponse` containing a string.
     */
    async mark(payload: FormData): Promise<APIResponse<string>> {
        // return this.post<any>(API_ROUTES.MARK_ATTENDANCE, payload);
        return new APIResponse<string>(200, "Attendance marked successfully!");
    }
}

export const attendance = new Attendance();
