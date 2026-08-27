import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct";
import { useCart } from "../../cart/hook/useCart";
import Toast from "../../../shared/Toast";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [hasSelectedVariant, setHasSelectedVariant] = useState(false);
  const [toast, setToast] = useState(null);
  const { handleGetProductById } = useProduct();
  const { handleAddItem } = useCart();

  useEffect(() => {
    let isMounted = true;

    const fetchProductDetails = async () => {
      try {
        const data = await handleGetProductById(productId);
        if (isMounted) {
          setProduct(data?.product || data);
        }
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };

    fetchProductDetails();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    // every product now always has at least one variant (enforced at
    // creation), so default-select the first one instead of making the
    // user click before they can add to cart
    const t = setTimeout(() => {
      if (product?.variants && product.variants.length > 0) {
        setSelectedAttributes(product.variants[0].attributes || {});
        setHasSelectedVariant(true);
      } else {
        setSelectedAttributes({});
        setHasSelectedVariant(false);
      }
      setSelectedImage(0);
    }, 0);
    return () => clearTimeout(t);
  }, [product]);

  const activeVariant = useMemo(() => {
    if (!hasSelectedVariant) return null;
    if (!product?.variants || product.variants.length === 0) return null;
    return product.variants.find((v) => {
      if (!v.attributes) return false;
      const vKeys = Object.keys(v.attributes);
      const sKeys = Object.keys(selectedAttributes);
      const isMatch = vKeys.every(
        (k) => v.attributes[k] === selectedAttributes[k],
      );
      return vKeys.length === sKeys.length && isMatch;
    });
  }, [hasSelectedVariant, product, selectedAttributes]);

  const availableAttributes = useMemo(() => {
    if (!product?.variants) return {};
    const attrs = {};
    product.variants.forEach((variant) => {
      if (variant.attributes) {
        Object.entries(variant.attributes).forEach(([key, value]) => {
          if (!attrs[key]) attrs[key] = new Set();
          attrs[key].add(value);
        });
      }
    });
    Object.keys(attrs).forEach((key) => {
      attrs[key] = Array.from(attrs[key]);
    });
    return attrs;
  }, [product]);

  useEffect(() => {
    // update state asynchronously to avoid synchronous setState inside effect
    const t = setTimeout(() => setSelectedImage(0), 0);
    return () => clearTimeout(t);
  }, [activeVariant]);

  const handleAttributeChange = (attrName, value) => {
    if (hasSelectedVariant && selectedAttributes[attrName] === value) {
      resetToOriginal();
      return;
    }

    setHasSelectedVariant(true);

    const newAttrs = { ...selectedAttributes, [attrName]: value };

    const exactMatch = product.variants.find((v) => {
      const vAttrs = v.attributes || {};
      return (
        Object.keys(newAttrs).every((k) => newAttrs[k] === vAttrs[k]) &&
        Object.keys(vAttrs).every((k) => newAttrs[k] === vAttrs[k])
      );
    });

    if (exactMatch) {
      setSelectedAttributes(exactMatch.attributes);
    } else {
      const fallbackVariant = product.variants.find(
        (v) => v.attributes && v.attributes[attrName] === value,
      );
      if (fallbackVariant) {
        setSelectedAttributes(fallbackVariant.attributes);
      } else {
        setSelectedAttributes(newAttrs);
      }
    }
  };

  const resetToOriginal = () => {
    setSelectedAttributes({});
    setHasSelectedVariant(false);
  };

  // every product on Snitch is a clothing item -> variants (size/color) are mandatory
  const hasVariants = product?.variants && product.variants.length > 0;

  const handleAddToCart = async () => {
    if (!activeVariant) {
      setToast({
        message: "Please select a size/color before adding to cart",
        type: "error",
      });
      return;
    }

    if (!user) {
      setToast({
        message: "Please login to add items to cart",
        type: "error",
      });
      navigate("/login");
      return;
    }

    const result = await handleAddItem({
      productId: product._id,
      variantId: activeVariant._id,
    });

    if (result.success) {
      setToast({ message: "Added to cart", type: "success" });
    } else {
      setToast({
        message: result.error || "Failed to add to cart",
        type: "error",
      });
    }
  };

  const displayImages = useMemo(() => {
    if (hasSelectedVariant && activeVariant?.images?.length > 0) {
      return activeVariant.images;
    }
    if (product?.images?.length > 0) {
      return product.images;
    }
    return [{ url: "/snitch_editorial_warm.png" }];
  }, [product, activeVariant, hasSelectedVariant]);

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center selection:bg-[#C9A96E]/30"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "var(--color-muted-light)",
          }}
          className="text-[10px] uppercase tracking-[0.2em] font-medium animate-pulse"
        >
          Retrieving piece...
        </p>
      </div>
    );
  }

  const displayDescription =
    hasSelectedVariant && activeVariant?.description
      ? activeVariant.description
      : product.description;

  const displayPrice = activeVariant?.price?.amount
    ? activeVariant.price
    : product.price;

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30 pb-24"
        style={{
          backgroundColor: "var(--color-bg)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-12 lg:pt-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            {/* ── LEFT: Image Gallery ── */}
            <div className="w-full lg:w-[70%] flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
              {/* Thumbnails (Vertical on Desktop, Horizontal on Mobile) */}
              {displayImages.length > 1 && (
                <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-20 lg:w-24 shrink-0 md:max-h-[calc(100vh-200px)]">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`shrink-0 w-20 md:w-full aspect-4/5 overflow-hidden transition-all duration-300 ${selectedImage === idx ? "opacity-100 ring-1 ring-[#C9A96E] ring-offset-2" : "opacity-50 hover:opacity-100"}`}
                      style={{
                        backgroundColor: "var(--color-surface-low)",
                        "--tw-ring-offset-color": "var(--color-bg)",
                      }}
                    >
                      <img
                        src={img.url}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div
                className="relative w-full aspect-4/5 overflow-hidden group"
                style={{ backgroundColor: "var(--color-surface-low)" }}
              >
                <img
                  src={
                    displayImages[selectedImage]?.url || displayImages[0].url
                  }
                  alt={product.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? displayImages.length - 1 : prev - 1,
                        )
                      }
                      className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--color-bg) 80%, transparent)",
                        borderColor: "var(--color-surface-highest)",
                        color: "var(--color-text)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--color-bg)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "color-mix(in srgb, var(--color-bg) 80%, transparent)")
                      }
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === displayImages.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--color-bg) 80%, transparent)",
                        borderColor: "var(--color-surface-highest)",
                        color: "var(--color-text)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--color-bg)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "color-mix(in srgb, var(--color-bg) 80%, transparent)")
                      }
                      aria-label="Next image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* ── RIGHT: Product Details ── */}
            <div className="w-full lg:w-[30%] lg:sticky lg:top-24 flex flex-col pt-4">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--color-text)",
                }}
              >
                {product.title}
              </h1>

              <div className="mb-8">
                <span
                  className="text-sm uppercase tracking-[0.2em] font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {displayPrice?.currency}{" "}
                  {displayPrice?.amount?.toLocaleString()}
                </span>
              </div>

              <div
                className="h-px w-full mb-8"
                style={{ backgroundColor: "var(--color-surface-highest)" }}
              />

              {/* Reset to original — only visible once a variant has been picked */}
              {hasSelectedVariant && (
                <button
                  onClick={resetToOriginal}
                  className="mb-6 text-[10px] uppercase tracking-[0.2em] font-medium underline transition-colors hover:text-[#C9A96E] self-start"
                  style={{ color: "var(--color-muted)" }}
                >
                  Show Original
                </button>
              )}

              {/* Options/Variants */}
              {Object.entries(availableAttributes).map(([attrName, values]) => (
                <div key={attrName} className="mb-6">
                  <h3
                    className="text-[10px] uppercase tracking-[0.24em] font-medium mb-3"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {attrName}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {values.map((val) => {
                      const isSelected = selectedAttributes[attrName] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => handleAttributeChange(attrName, val)}
                          className={`px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${isSelected ? "border-(--color-text) bg-(--color-text) text-(--color-bg)" : "border-(--color-outline-variant) text-(--color-text) hover:border-(--color-text)"}`}
                          style={
                            isSelected ? {} : { backgroundColor: "transparent" }
                          }
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Stock Information */}
              {activeVariant && activeVariant.stock !== undefined && (
                <div className="mb-6">
                  <span
                    className={`text-[10px] uppercase tracking-[0.2em] font-medium ${activeVariant.stock > 0 ? "text-green-700" : "text-red-700"}`}
                  >
                    {activeVariant.stock > 0
                      ? `${activeVariant.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              )}

              <div className="mb-12">
                <h3
                  className="text-[10px] uppercase tracking-[0.24em] font-medium mb-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  The Details
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  {displayDescription}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mt-auto">
                <button
                  className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={hasVariants && !activeVariant}
                  style={{
                    backgroundColor: "var(--color-text)",
                    color: "var(--color-bg)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (hasVariants && !activeVariant) return;
                    e.currentTarget.style.backgroundColor =
                      "var(--color-accent)";
                    e.currentTarget.style.color = "var(--color-text)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-text)";
                    e.currentTarget.style.color = "var(--color-bg)";
                  }}
                  onClick={handleAddToCart}
                >
                  {hasVariants && !activeVariant
                    ? "Select a Variant"
                    : "Add to Cart"}
                </button>

                <button
                  className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 border"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "var(--color-outline-variant)",
                    color: "var(--color-text)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--color-outline-variant)";
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* Extra elegant details */}
              <div
                className="mt-14 space-y-4 text-[10px] uppercase tracking-widest"
                style={{ color: "var(--color-muted-light)" }}
              >
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "var(--color-surface-highest)" }}
                >
                  <span>Shipping</span>
                  <span>Complimentary over INR 15,000</span>
                </div>
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "var(--color-surface-highest)" }}
                >
                  <span>Returns</span>
                  <span>Within 14 days of delivery</span>
                </div>
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "var(--color-surface-highest)" }}
                >
                  <span>Authenticity</span>
                  <span>100% Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
