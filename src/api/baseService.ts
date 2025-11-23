import type { AxiosError, AxiosResponse } from "axios";
import APIResponse from "@/classes/APIResponse";
import axiosInstance from "./axiosInstance";

class BaseService {
    protected async get<T>(url: string): Promise<APIResponse<T>> {
        try {
            const response = await axiosInstance.get<T>(url);
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error fetching data: ", error);
            return this.handleError(error);
        }
    }

    protected async post<T>(url: string, data?: any): Promise<APIResponse<T>> {
        try {
            const response = await axiosInstance.post<T>(url, data);
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error fetching data: ", error);
            return this.handleError(error);
        }
    }

    private handleResponse<T>(response: AxiosResponse<T>): APIResponse<T> {
        return new APIResponse<T>(response.status, response.data);
    }

    private handleError<T>(error: any): APIResponse<T> {
        const axiosError = error as AxiosError;
        console.log("Error: ", axiosError);
        console.log("Error response: ", axiosError.response);

        if (error.code === -2 || error.code === -3) {
            return new APIResponse<T>(error.code, null);
        }

        if (error.response) {
            return new APIResponse<T>(error.response.status, error.response.data);
        }

        return new APIResponse<T>(APIResponse.NETWORK_ERROR, null);
    }
}

export default BaseService;
