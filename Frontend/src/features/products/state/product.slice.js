import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        sellerProduct: [],
        products: [],
        error: null
    },
    reducers: {
        setSellerProduct: (state, action) => { state.sellerProduct = action.payload; },
        setProducts: (state, action) => { state.products = action.payload; },
        setError: (state, action) => { state.error = action.payload; },
    }
});

export const { setSellerProduct, setProducts, setError } = productSlice.actions;

export default productSlice.reducer;