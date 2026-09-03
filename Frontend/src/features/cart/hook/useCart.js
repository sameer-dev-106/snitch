import { useDispatch } from "react-redux";
import { setError, setItems, incrementCartItem, decrementCartItem } from "../state/cart.slice";
import { addItemApi, getCartApi, removeItemApi, incrementCartItemApi, decrementCartItemApi } from "../service/cart.api";

export const useCart = () => {
    const dispatch = useDispatch();

    const handleAddItem = async ({ productId, variantId }) => {
        try {
            await addItemApi({ productId, variantId });
            // After adding an item, fetch the updated cart data to update the state
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

    const handleIncrementCartItem = async ({ productId, variantId }) => {
        try {
            const data = await incrementCartItemApi({ productId, variantId });
            dispatch(incrementCartItem({ productId, variantId }));
            return { success: true, data };
        } catch (err) {
            dispatch(setError(err?.message || ""));
            return { success: false, error: err }
        }
    }

    const handleDecrementCartItem = async ({ productId, variantId }) => {
        try {
            const data = await decrementCartItemApi({ productId, variantId });
            dispatch(decrementCartItem({ productId, variantId }));
            return { success: true, data };
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

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveItem };
};
