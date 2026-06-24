import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: { sellerProduct: [], error: null },
    reducers: {
        setSellerProduct: (state, action) => { state.sellerProduct = action.payload; },
        setError: (state, action) => { state.error = action.payload; },
    }
});

export const { setSellerProduct, setError } = productSlice.actions;

export default productSlice.reducer;