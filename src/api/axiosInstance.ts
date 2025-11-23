import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // --------------------------------------------------------------
        // 1. NO INTERNET (Browser offline)
        // --------------------------------------------------------------
        if (!navigator.onLine) {
            return Promise.reject({
                code: -2,
                type: "NO_INTERNET",
                description: "No internet connection.",
                data: null,
            });
        }

        // --------------------------------------------------------------
        // 2. SERVER DOWN / Backend not running / CORS failed
        // --------------------------------------------------------------
        if (error.code === "ECONNABORTED" || error.message === "Network Error") {
            return Promise.reject({
                code: -3,
                type: "SERVER_DOWN",
                description: "Unable to connect to server. It may be offline.",
                data: null,
            });
        }

        // --------------------------------------------------------------
        // 3. Server responded (Statuses: 400, 401, 403, 500 etc.)
        // --------------------------------------------------------------
        if (error.response) {
            const { status, data } = error.response;

            return Promise.reject({
                code: status,
                type: "HTTP_ERROR",
                description: data?.description || "Server returned an error.",
                data: data,
            });
        }

        return Promise.reject({
            code: -1,
            type: "UNKNOWN",
            description: "Unknown error occurred.",
            data: null,
        });
    }
);

export default axiosInstance;