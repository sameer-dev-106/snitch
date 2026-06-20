const SellerCheckbox = ({ props }) => {
  return (
    <label
      htmlFor="reg-isSeller"
      className="flex items-center gap-4 cursor-pointer group"
    >
      <div className="relative shrink-0">
        <input
          id="reg-isSeller"
          type="checkbox"
          name="isSeller"
          checked={props.isSeller}
          onChange={props.handleChange}
          className="peer sr-only"
        />
        {/* Custom checkbox */}
        <div
          className="w-4 h-4 border transition-all duration-200 flex items-center justify-center peer-checked:border-[#C9A96E]"
          style={{
            borderColor: props.isSeller ? "#C9A96E" : "#d0c5b5",
            backgroundColor: props.isSeller ? "#C9A96E" : "transparent",
          }}
        >
          {props.isSeller && (
            <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="#fbf9f6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      <span
        className="text-[11px] uppercase tracking-[0.15em] transition-colors duration-200"
        style={{ color: props.isSeller ? "#C9A96E" : "#7A6E63" }}
      >
        Register as Seller
      </span>
    </label>
  );
};

export default SellerCheckbox;
