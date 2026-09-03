import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [], error: null },
    reducers: {
        setItems: (state, action) => { state.items = action.payload; },
        addItem: (state, action) => { state.items.push(action.payload) },
        setError: (state, action) => { state.error = action.payload; },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload;
            state.items = state.items.map(item => {
                if (item.product_id === productId && item.variant === variantId) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            });
        }
    }
});

export const { setItems, addItem, setError, incrementCartItem } = cartSlice.actions;
export default cartSlice.reducer;