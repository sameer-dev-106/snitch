import ProductCard from "./ProductCard";

const ProductGrid = ({ products, emptyTitle, emptyMessage, basePath }) => {
  return (
    <>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-24">
          {products.map((product) => {
            const imageUrl =
              product.images && product.images.length > 0
                ? product.images[0].url
                : "/snitch_editorial_warm.png"; // Fallback to our warm editorial

            return (
              <ProductCard
                product={product}
                imageUrl={imageUrl}
                basePath={basePath}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center flex flex-col items-center">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-medium mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            {emptyTitle}
          </span>
          <p
            className="max-w-md mx-auto text-lg leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--color-muted)",
            }}
          >
            {emptyMessage}
          </p>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
