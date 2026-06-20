import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
    baseURL: `${BACKEND_URL}/api/auth`,
    withCredentials: true,
});

const handleApiError = (err, fallbackMessage) => {
    throw err?.response?.data?.message || err?.message || fallbackMessage;
};

export const registerApi = async ({ email, contact, password, fullname, isSeller }) => {
    try {
        const response = await API.post("/register", { email, contact, password, fullname, isSeller });
        return response.data;
    } catch (err) {
        handleApiError(err, "Failed to register user.");
    }
};

export const loginApi = async ({ email, password }) => {
    try {
        const response = await API.post("/login", { email, password });
        return response.data;
    } catch (err) {
        handleApiError(err, "Failed to login.");
    }
};