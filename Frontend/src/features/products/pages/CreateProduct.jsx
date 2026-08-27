import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";
import TopBar from "../components/TopBar";
import ProductForm from "../components/ProductForm";
import AttributeInput from "../components/AttributeInput";
import StockField from "../components/StockField";
import Toast from "../../../shared/Toast";

const MAX_IMAGES = 7;

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: 0,
    priceCurrency: "INR",
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  // ── First variant (mandatory) — a product with zero variants can't be
  // bought by anyone, so we collect at least one right here at creation time.
  const [attributeInputs, setAttributeInputs] = useState([
    { key: "", value: "" },
  ]);
  const [variant, setVariant] = useState({
    stock: 0,
    price: { amount: "", currency: "INR" },
  });

  const handleAddAttribute = () => {
    setAttributeInputs((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleAttributeChange = (index, field, value) => {
    setAttributeInputs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveAttribute = (index) => {
    setAttributeInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addFiles = (files) => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;
    const toAdd = Array.from(files).slice(0, remaining);
    const newImages = toAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleFileChange = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images],
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const removeImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasValidAttribute = attributeInputs.some(
      (attr) => attr.key.trim() && attr.value.trim(),
    );
    if (!hasValidAttribute) {
      setToast({
        message: "Add at least one attribute (e.g. Size: M) for this product",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const attributes = {};
      attributeInputs.forEach((attr) => {
        if (attr.key.trim()) attributes[attr.key.trim()] = attr.value.trim();
      });

      const variants = [
        {
          attributes,
          stock: Number(variant.stock) || 0,
        },
      ];

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priceAmount", formData.priceAmount);
      data.append("priceCurrency", formData.priceCurrency);
      data.append("variants", JSON.stringify(variants));
      images.forEach((img) => data.append("images", img.file));

      const result = await handleCreateProduct(data);
      if (!result.success) {
        setToast({
          message: result.error || "Failed to create product",
          type: "error",
        });
        return;
      }
      navigate("/seller/dashboard");
    } catch (err) {
      console.error("Failed to create product", err);
      setToast({ message: "Failed to create product", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="max-w-6xl mx-auto px-8 lg:px-16 xl:px-24">
          {/* ── Top Bar ── */}
          <TopBar />

          {/* ── Page Header ── */}
          <div className="pt-10 pb-0">
            <h1
              className="text-4xl lg:text-5xl font-light leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--color-text)",
              }}
            >
              New Listing
            </h1>
            {/* Gold rule separator */}
            <div
              className="mt-4 w-14 h-px"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
          </div>

          {/* ── Form ── */}
          <ProductForm
            formData={formData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isSubmitting={isSubmitting}
            images={images}
            MAX_IMAGES={MAX_IMAGES}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            isDragging={isDragging}
            removeImage={removeImage}
          >
            {/* ── First Variant (mandatory) ── */}
            <div
              className="mt-16 lg:mt-20 pt-10 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <h2
                className="text-2xl font-light mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--color-text)",
                }}
              >
                Starting Variant
              </h2>
              <p
                className="text-xs mb-8"
                style={{ color: "var(--color-muted)" }}
              >
                Every listing needs at least one buyable option (e.g. Size: M).
                You can add more sizes/colors later from the dashboard.
              </p>
              <div className="space-y-8 max-w-md">
                <AttributeInput
                  props={{
                    attributeInputs,
                    handleAddAttribute,
                    handleRemoveAttribute,
                    handleAttributeChange,
                  }}
                />
                <StockField newVariant={variant} setNewVariant={setVariant} />
              </div>
            </div>
          </ProductForm>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default CreateProduct;
