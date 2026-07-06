import axios from "axios";

const API = axios.create({
    baseURL: "/api/products",
    withCredentials: true
});

const handleApiError = (err, fallbackMessage) => {
    throw err?.response?.data?.message || err?.message || fallbackMessage;
};

export const createProductApi = async (formData) => {
    try {
        const response = await API.post("/", formData);
        return response?.data;
    } catch (err) {
        handleApiError(err, "Failed to create product");
    }
}

export const getSellerProduct = async () => {
    try {
        const response = await API.get("/seller");
        return response?.data;
    } catch (err) {
        handleApiError(err, "Failed to fetch seller products");
    }
}

export const getAllProducts = async () => {
    try {
        const response = await API.get("/");
        return response?.data;
    } catch (err) {
        handleApiError(err, "Filed to fetch products");
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await API.get(`/detail/${productId}`);
        return response?.data;
    } catch (err) {
        handleApiError(err, "Failed to fetch product details");
    }
}
