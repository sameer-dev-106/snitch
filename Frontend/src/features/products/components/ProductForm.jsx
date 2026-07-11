import InputFiled from "../../auth/components/common/InputFiled";
import SubmitBtn from "../../auth/components/common/SubmitBtn";
import ImagesDrop from "./ImagesDrop";
import PriceField from "./PriceField";
import TextareaField from "./TextareaField";

const ProductForm = ({
  formData,
  handleSubmit,
  handleChange,
  isSubmitting,
  images,
  MAX_IMAGES,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleFileChange,
  fileInputRef,
  isDragging,
  removeImage,
}) => {
  const inputClass =
    "w-full bg-transparent outline-none py-4 text-sm transition-colors duration-300 placeholder:text-(--color-muted)";

  return (
    <form onSubmit={handleSubmit} className="pt-14 pb-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 lg:items-start">
        {/* ── LEFT COLUMN: Text Fields ── */}
        <div className="flex flex-col gap-12">
          {/* Product Title */}
          <InputFiled
            props={{
              label: "Product Title",
              name: "title",
              type: "text",
              placeholder: "e.g. Oversized Linen Shirt",
              value: formData.title,
              handleChange,
              className: inputClass,
            }}
          />

          {/* Description */}
          <TextareaField
            props={{
              label: "Description",
              name: "description",
              placeholder: "Describe the product — material, fit, details...",
              value: formData.description,
              handleChange,
            }}
          />

          {/* Price */}
          <PriceField
            props={{
              label: "Price",
              amountName: "priceAmount",
              amountValue: formData.price,
              currencyName: "priceCurrency",
              currencyValue: formData.currency,
              handleChange,
            }}
          />
        </div>

        {/* ── RIGHT COLUMN: Images ── */}
        <ImagesDrop
          images={images}
          MAX_IMAGES={MAX_IMAGES}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          fileInputRef={fileInputRef}
          isDragging={isDragging}
          handleFileChange={handleFileChange}
          removeImage={removeImage}
        />
      </div>

      {/* ── Submit Button ── */}
      <div className="mt-16 lg:mt-20">
        <SubmitBtn label="Publish Listing" isLoading={isSubmitting} />
      </div>
    </form>
  );
};

export default ProductForm;
