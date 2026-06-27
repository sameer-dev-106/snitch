import { useEffect } from "react";
import { useProduct } from "../hook/useProduct";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import TopBar from "../components/TopBar";
import ProductGrid from "../components/ProductGrid";

const Dashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSellerProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <ProductGrid sellerProducts={sellerProducts} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
