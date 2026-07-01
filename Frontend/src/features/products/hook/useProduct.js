import { createProductApi, getSellerProduct, getAllProducts } from "../service/product.api";
import { setSellerProduct, setProducts, setError } from "../state/product.slice";
import { useDispatch } from "react-redux";

export const useProduct = () => {
    const dispatch = useDispatch();

    const handleCreateProduct = async (fromData) => {
        try {
            const data = await createProductApi(fromData);
            return { success: true, data: data?.product };
        } catch (err) {
            dispatch(setError(err?.message || "Something went wrong"));
            return { success: false, error: err };
        }
    }

    const handleGetSellerProduct = async () => {
        try {
            const data = await getSellerProduct();
            const products = data?.products;
            if (products) dispatch(setSellerProduct(products));
            return { success: true, products };
        } catch (err) {
            dispatch(setError(err?.message || "Something went wrong"));
            return { success: false, error: err };
        }
    }

    const handleGetAllProducts = async () => {
        try {
            const data = await getAllProducts();
            const products = data?.products;
            if (products) dispatch(setProducts(products));
            return { success: true, products };
        } catch (err) {
            dispatch(setError(err?.message || "Something went wrong"));
            return { success: false, error: err };
        }
    }

    return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts };

}