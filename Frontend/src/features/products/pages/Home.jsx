import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  const products = useSelector((state) => state.product.products);
  // const user = useSelector((state) => state.auth.user);
  const { handleGetAllProducts } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
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
        className="min-h-screen selection:bg-[#C9A96E]/30"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          {/* ── Hero / Header ── */}
          <div className="pt-20 pb-20 text-center flex flex-col items-center">
            <span
              className="text-[10px] uppercase tracking-[0.24em] font-medium mb-6"
              style={{ color: "#C9A96E" }}
            >
              The Collection
            </span>
            <h1
              className="text-5xl lg:text-7xl font-light leading-tight mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#1b1c1a",
              }}
            >
              Curated Archive
            </h1>
            <p
              className="max-w-xl mx-auto text-sm leading-relaxed"
              style={{ color: "#7A6E63" }}
            >
              Discover our latest curation of premium minimalist pieces,
              meticulously designed for effortless elegance and enduring
              quality.
            </p>
          </div>

          {/* ── Product Grid ── */}
          <ProductGrid
            products={products}
            basePath="/product"
            emptyTitle="No pieces available"
            emptyMessage="We are currently preparing our next collection. Please check back later."
          />
        </div>

        {/* ── Footer ── */}
        <footer
          className="border-t py-12 text-center"
          style={{ borderColor: "#e4e2df" }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C9A96E",
            }}
          >
            Snitch. © {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </>
  );
};

export default Home;
