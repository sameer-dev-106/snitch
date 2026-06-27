import { useEffect } from "react";
import { useProduct } from "../hook/useProduct";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import TopBar from "../components/TopBar";

const Dashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-(--color-accent)/30"
        style={{
          backgroundColor: "var(--color-bg)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          {/* ── Top Bar ── */}
          <TopBar />

          {/* ── Page Header ── */}
          <div className="pt-10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
            <div>
              <h1
                className="text-4xl lg:text-5xl font-light leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--color-text)",
                }}
              >
                Your Vault
              </h1>
              {/* Gold rule separator */}
              <div
                className="mt-4 w-14 h-px"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
            </div>

            <button
              onClick={() => navigate("/seller/create-product")}
              className="py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 w-full md:w-auto text-center"
              style={{
                backgroundColor: "var(--color-text)",
                color: "var(--color-bg)",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-text)";
                e.currentTarget.style.color = "var(--color-bg)";
              }}
            >
              New Listing
            </button>
          </div>

          {/* ── Product Grid ── */}
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
                You haven't added any curated pieces to your archive yet. Begin
                by creating a new listing.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
