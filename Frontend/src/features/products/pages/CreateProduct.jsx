import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";
import TopBar from "../components/TopBar";
import ProductForm from "../components/ProductForm";

const MAX_IMAGES = 7;

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

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
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priceAmount", formData.priceAmount);
      data.append("priceCurrency", formData.priceCurrency);
      images.forEach((img) => data.append("images", img.file));
      await handleCreateProduct(data);
      navigate("/");
    } catch (err) {
      console.error("Failed to create product", err);
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
          />
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
