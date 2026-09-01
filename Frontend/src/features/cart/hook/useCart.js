import { useDispatch } from "react-redux";
import { setError, setItems } from "../state/cart.slice";
import { addItemApi, getCartApi, removeItemApi } from "../service/cart.api";

export const useCart = () => {
    const dispatch = useDispatch();

    const handleAddItem = async ({ productId, variantId }) => {
        try {
            await addItemApi({ productId, variantId });
            // backend only returns {message, success} on add, not the item itself,
            // so pull the fresh cart right after -> keeps nav badge/totals in sync
            const cartData = await getCartApi();
            const items = cartData?.cart?.items;
            if (items) dispatch(setItems(items));
            return { success: true }
        } catch (err) {
            dispatch(setError(err?.message || ""));
            return { success: false, error: err };
        }
    }

    const handleGetCart = async () => {
        try {
            const data = await getCartApi();
            const items = data?.cart?.items
            if (items) dispatch(setItems(items));
            return { success: true, items }
        } catch (err) {
            dispatch(setError(err?.message || ""));
            return { success: false, error: err }
        }
    }

    const handleRemoveItem = async ({ productId, variantId }) => {
        try {
            const data = await removeItemApi({ productId, variantId });
            return { success: true, data };
        } catch (err) {
            dispatch(setError(err?.message || ""));
            return { success: false, error: err };
        }
    }

    return { handleAddItem, handleGetCart, handleRemoveItem };
};
