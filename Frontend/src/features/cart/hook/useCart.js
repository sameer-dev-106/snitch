import { useDispatch } from "react-redux";
import { addItem, setError, setItems } from "../state/cart.slice";
import { addItemApi, getCartApi } from "../service/cart.api";

export const useCart = () => {
    const dispatch = useDispatch();

    const handleAddItem = async ({ productId, variantId }) => {
        try {
            const data = await addItemApi({ productId, variantId });
            const item = data?.item;
            if (item) dispatch(addItem(item));
            return { success: true, item }
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

    return { handleAddItem, handleGetCart };
};
