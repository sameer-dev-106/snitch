import { useEffect, useState } from "react";
import { useProduct } from "../hook/useProduct";
import { useParams } from "react-router";
import { PlusIcon } from "../utils/utils";
import AttributeInput from "../components/AttributeInput";
import StockField from "../components/StockField";
import ImageField from "../components/ImageField";
import VariantsList from "../components/VariantsList";

const SellerProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [localVariants, setLocalVariants] = useState([]);
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [loading, setLoading] = useState(true);

  // UI state for inputs to maintain focus
  const [attributeInputs, setAttributeInputs] = useState([
    { key: "", value: "" },
  ]);

  // New variant state
  const [newVariant, setNewVariant] = useState({
    images: [],
    stock: 0,
    attributes: {}, // Strictly an object
    price: { amount: "", currency: "INR" },
  });

  const { productId } = useParams();
  const { handleGetProductById, handleAddProductVariant } = useProduct();

  useEffect(() => {
    let isMounted = true;

    const fetchProductDetails = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const data = await handleGetProductById(productId);
        const prod = data?.product || data;
        if (!isMounted) return;
        setProduct(prod);
        // Initialize variants locally
        if (prod?.variants) {
          setLocalVariants(prod.variants);
        }
      } catch (error) {
        console.error("Failed to fetch product details", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProductDetails();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Handlers for modifying existing variant stock natively
  const handleStockChange = (index, newStock) => {
    const updatedVariants = [...localVariants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      stock: Number(newStock),
    };
    setLocalVariants(updatedVariants);
  };

  // Handlers for New Variant Form
  const handleAddNewVariant = async () => {
    // Validate required at least one attribute to be filled
    const hasValidAttribute = attributeInputs.some(
      (attr) => attr.key.trim() && attr.value.trim(),
    );
    if (!hasValidAttribute) {
      alert("At least one valid attribute is required.");
      return;
    }

    // Maps preview URL so the variant list can display the image locally
    const cleanImages = newVariant.images.map((img) => ({
      url: img.previewUrl,
      file: img.file,
    }));

    // Attributes is already an object in newVariant, just use it safely
    const cleanAttributes = { ...newVariant.attributes };

    const variantToSave = {
      images: cleanImages,
      stock: Number(newVariant.stock),
      attributes: cleanAttributes,
      price: newVariant.price.amount
        ? Number(newVariant.price.amount)
        : undefined, // price is optional
    };

    setLocalVariants([...localVariants, variantToSave]);
    setIsAddingVariant(false);

    await handleAddProductVariant(productId, variantToSave);

    // Reset form
    // Note: should ideally revoke old object URLs as well to prevent memory leaks if it were a long-lived SPA
    setAttributeInputs([{ key: "", value: "" }]);
    setNewVariant({
      images: [],
      stock: 0,
      attributes: {},
      price: { amount: "", currency: "INR" },
    });
  };

  const handleAddAttribute = () => {
    setAttributeInputs((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedInputs = [...attributeInputs];
    updatedInputs[index][field] = value;
    setAttributeInputs(updatedInputs);

    // Synchronize to object format
    const newAttrsObj = {};
    updatedInputs.forEach((attr) => {
      if (attr.key.trim() !== "") {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant((prev) => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleRemoveAttribute = (index) => {
    const updatedInputs = attributeInputs.filter((_, i) => i !== index);
    setAttributeInputs(updatedInputs);

    // Synchronize to object format
    const newAttrsObj = {};
    updatedInputs.forEach((attr) => {
      if (attr.key.trim() !== "") {
        newAttrsObj[attr.key.trim()] = attr.value;
      }
    });
    setNewVariant((prev) => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const availableSlots = 7 - newVariant.images.length;
    const filesToAdd = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      alert(`You can only upload up to 7 images. ${filesToAdd.length} added.`);
    }

    const newImageObjects = filesToAdd.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setNewVariant((prev) => ({
      ...prev,
      images: [...prev.images, ...newImageObjects],
    }));

    // Clear the input so identical files can be selected again if needed
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = newVariant.images[index];
    if (imageToRemove?.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    const updatedImages = newVariant.images.filter((_, i) => i !== index);
    setNewVariant((prev) => ({ ...prev, images: updatedImages }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center text-[#1b1c1a] font-serif">
        Loading gallery...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center text-[#1b1c1a] font-serif">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-sans selection:bg-[#C9A96E]/30 pb-24">
      {/* Top Banner / Header */}
      <header className="sticky top-0 z-10 bg-[#fbf9f6]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl tracking-wide uppercase">
          {product.title?.substring(0, 20)}
          {product.title?.length > 20 ? "..." : ""}
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
        {/* Base Product Info */}
        <section className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="w-full md:w-1/2">
            {/* Gallery placeholder */}
            <div className="w-full aspect-4/5 bg-[#f5f3f0] overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#7f7668]">
                  No Image
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {product.images.slice(1).map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={`Thumb ${i}`}
                    className="w-16 h-20 object-cover bg-[#f5f3f0] shrink-0"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4 uppercase">
              {product.title}
            </h2>
            <p className="text-[#6e6258] text-lg mb-6 leading-relaxed max-w-md">
              {product.description}
            </p>
            <div className="text-2xl tracking-wide font-light mb-8">
              {product.price?.amount} {product.price?.currency}
            </div>
          </div>
        </section>

        {/* Variants & Inventory */}
        <section className="bg-[#f5f3f0] p-6 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h3 className="font-serif text-3xl uppercase">
              Variants & Inventory
            </h3>
            {!isAddingVariant && (
              <button
                onClick={() => setIsAddingVariant(true)}
                className="bg-[#745a27] text-[#ffffff] px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#5a4312] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusIcon /> Add New Variant
              </button>
            )}
          </div>

          {/* Add New Variant Form */}
          {isAddingVariant && (
            <div className="bg-[#ffffff] p-6 md:p-8 mb-12 shadow-[0_20px_40px_rgba(27,28,26,0.04)]">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-serif text-xl uppercase">Create Variant</h4>
                <button
                  onClick={() => setIsAddingVariant(false)}
                  className="text-[#7f7668] hover:text-[#1b1c1a] text-sm uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Left Col: Attributes & Basics */}
                <div className="space-y-6">
                  {/* Dynamic Attributes */}
                  <AttributeInput
                    props={{
                      attributeInputs,
                      handleAddAttribute,
                      handleRemoveAttribute,
                      handleAttributeChange,
                    }}
                  />

                  {/* Stock & Price */}
                  <StockField
                    newVariant={newVariant}
                    setNewVariant={setNewVariant}
                  />
                </div>

                {/* Form Right Col: Images */}
                <ImageField
                  props={{
                    newVariant,
                    handleRemoveImage,
                    handleImageUpload,
                  }}
                />
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleAddNewVariant}
                  className="bg-linear-to-r from-[#745a27] to-[#c9a96e] text-[#ffffff] px-8 py-3 uppercase tracking-wider text-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Save Variant
                </button>
              </div>
            </div>
          )}

          {/* Variants List */}
          <VariantsList
            localVariants={localVariants}
            handleStockChange={handleStockChange}
          />
        </section>
      </main>
    </div>
  );
};

export default SellerProductDetails;
