import { createProductApi, getSellerProduct, getAllProducts, getProductById, addProductVariants } from "../service/product.api";
import { setSellerProduct, setProducts, setError } from "../state/product.slice";
import { useDispatch } from "react-redux";

export const useProduct = () => {
    const dispatch = useDispatch();

    const handleCreateProduct = async (fromData) => {
        try {
            const data = await createProductApi(fromData);
            return { success: true, data: data?.product };
        } catch (err) {
            dispatch(setError(err?.message || "Error creating product"));
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
            dispatch(setError(err?.message || "Error fetching seller products"));
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
            dispatch(setError(err?.message || "Error fetching products"));
            return { success: false, error: err };
        }
    }

    const handleGetProductById = async (productId) => {
        try {
            const data = await getProductById(productId);
            const product = data?.product;
            return product;
        } catch (err) {
            dispatch(setError(err?.message || "Error fetching product details"));
            return { success: false, error: err }
        }
    }

    const handleAddProductVariant = async (productId, newProductVariant) => {
        try {
            const data = await addProductVariants(productId, newProductVariant);
            return { success: true, data };
        } catch (err) {
            dispatch(setError(err?.message || "Error adding new product variants"));
            return { success: false, error: err }
        }
    }

    return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleGetProductById, handleAddProductVariant };

}