import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [], error: null },
    reducers: {
        setItems: (state, action) => { state.items = action.payload; },
        addItem: (state, action) => { state.items.push(action.payload) },
        setError: (state, action) => { state.error = action.payload; },
    }
});

export const { setItems, addItem, setError } = cartSlice.actions;
export default cartSlice.reducer;