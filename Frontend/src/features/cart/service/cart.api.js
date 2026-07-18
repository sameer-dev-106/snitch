import axios from "axios";

const API = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
});

const handleApiError = (err, fallbackMessage) => {
    throw err?.response?.data?.message || err?.message || fallbackMessage;
};

export const addItemApi = async ({ productId, variantId }) => {
    try {
        const response = await API.post(`/add/${productId}/${variantId}`);
        return response.data;
    } catch (err) {
        handleApiError(err, "Failed to add items in cart")
    }
}

