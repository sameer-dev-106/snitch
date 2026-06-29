import ProductCard from "./ProductCard";

const ProductGrid = ({ sellerProducts }) => {

  return (
    <>
      {sellerProducts && sellerProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-24">
          {sellerProducts.map((product) => {
            const imageUrl =
              product.images && product.images.length > 0
                ? product.images[0].url
                : "/snitch_editorial_warm.png"; // Fallback to our warm editorial

            return <ProductCard product={product} imageUrl={imageUrl} />;
          })}
        </div>
      ) : (
        <div className="py-24 text-center flex flex-col items-center">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-medium mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            Empty Vault
          </span>
          <p
            className="max-w-md mx-auto text-lg leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--color-muted)",
            }}
          >
            You haven't added any curated pieces to your archive yet. Begin by
            creating a new listing.
          </p>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
