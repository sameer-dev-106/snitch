import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProduct } from "../hook/useProduct";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { handleGetProductById } = useProduct();

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      const data = await handleGetProductById(productId);
      if (isMounted) {
        setProduct(data);
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId, handleGetProductById]);

  return (
    <div>
      <h1>{product?.name ?? "ProductDetail"}</h1>
    </div>
  );
};

export default ProductDetail;
