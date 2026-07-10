const VariantsList = ({ localVariants, handleStockChange }) => {
  return (
    <>
      {localVariants.length === 0 ? (
        <div className="py-12 text-center text-[#6e6258]">
          <p>No variants have been created yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {localVariants.map((variant, idx) => (
            <div
              key={idx}
              className="bg-[#ffffff] flex flex-col pt-4 shadow-[0_20px_40px_rgba(27,28,26,0.02)]"
            >
              <div className="px-6 flex gap-4 h-24 mb-4">
                {/* Variant Thumb */}
                <div className="w-16 h-20 bg-[#f5f3f0] shrink-0">
                  {variant.images && variant.images.length > 0 ? (
                    <img
                      src={variant.images[0].url}
                      alt="Variant"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#7f7668]">
                      N/A
                    </div>
                  )}
                </div>
                {/* Attributes */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {Object.entries(variant.attributes || {}).map(
                      ([key, val]) => (
                        <span
                          key={key}
                          className="bg-[#f5f3f0] px-2 py-1 text-xs uppercase tracking-wider text-[#4d463a]"
                        >
                          <span className="text-[#a8a094]">{key}:</span> {val}
                        </span>
                      ),
                    )}
                  </div>
                  <div className="text-sm font-light">
                    {variant.price?.amount
                      ? `${variant.price.amount} ${variant.price.currency}`
                      : "Base Price"}
                  </div>
                </div>
              </div>

              {/* Stock Management Row */}
              <div className="mt-auto border-t border-[#f5f3f0] bg-[#fbf9f6] flex items-center px-6 py-3 justify-between">
                <label className="text-sm text-[#6e6258] uppercase tracking-wider">
                  Current Stock
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={variant.stock || 0}
                    onChange={(e) => handleStockChange(idx, e.target.value)}
                    className="w-20 bg-transparent border-b border-[#d0c5b5] py-1 text-right focus:outline-none focus:border-[#745a27] font-serif text-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VariantsList;
