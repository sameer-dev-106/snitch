import { useNavigate } from "react-router";

const ProductGrid = ({sellerProducts}) => {

  const navigate = useNavigate();

  return (
    <>
      {sellerProducts && sellerProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-24">
          {sellerProducts.map((product) => {
            const imageUrl =
              product.images && product.images.length > 0
                ? product.images[0].url
                : "/snitch_editorial_warm.png"; // Fallback to our warm editorial

            return (
              <div
                onClick={() => {
                  navigate(`/seller/product/${product._id}`);
                }}
                key={product._id}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div
                  className="aspect-4/5 overflow-hidden mb-6"
                  style={{ backgroundColor: "#f5f3f0" }}
                >
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className="text-xl leading-snug transition-colors duration-300 group-hover:text-(--color-accent)"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "var(--color-text)",
                      }}
                    >
                      {product.title}
                    </h3>
                  </div>

                  <p
                    className="text-[12px] line-clamp-2 leading-relaxed"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {product.description}
                  </p>

                  <div className="mt-2">
                    <span
                      className="text-[10px] uppercase tracking-[0.2em] font-medium"
                      style={{ color: "var(--color-text)" }}
                    >
                      {product.price?.currency}{" "}
                      {product.price?.amount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
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
}

export default ProductGrid