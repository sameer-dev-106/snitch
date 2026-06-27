const CURRENCIES = ["INR", "USD", "EUR", "GBP"];

const PriceField = ({ props }) => {
  const inputClass =
    "w-full bg-transparent outline-none py-4 text-sm transition-colors duration-300 placeholder:text-(--color-muted)";
  const inputStyle = {
    color: "var(--color-text)",
    borderBottom: "1px solid var(--color-border)",
    fontFamily: "'Inter', sans-serif",
  };
  const handleFocus = (e) => {
    e.target.style.borderBottomColor = "#C9A96E";
  };
  const handleBlur = (e) => {
    e.target.style.borderBottomColor = "var(--color-muted)";
  };

  return (
    <div className="flex flex-col gap-3">
      <label
        className="text-[10px] uppercase tracking-[0.2em] font-medium"
        style={{ color: "var(--color-border)" }}
      >
        {props.label}
      </label>

      <div className="flex gap-5 items-end">
        {/* Amount */}
        <div className="flex flex-col gap-1 flex-3">
          <span
            className="text-[9px] uppercase tracking-[0.18em]"
            style={{ color: "var(--color-border)" }}
          >
            Amount
          </span>
          <input
            id={`cp-${props.amountName}`}
            type="number"
            name={props.amountName}
            value={props.amountValue}
            onChange={props.handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            className={inputClass}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {/* Currency */}
        <div className="flex flex-col gap-1 flex-1">
          <span
            className="text-[9px] uppercase tracking-[0.18em]"
            style={{ color: "var(--color-border)" }}
          >
            Currency
          </span>
          <select
            id={`cp-${props.currencyName}`}
            name={props.currencyName}
            value={props.currencyValue || "INR"}
            onChange={props.handleChange}
            className="w-full bg-transparent outline-none py-4 text-sm cursor-pointer appearance-none transition-colors duration-300"
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {CURRENCIES.map((c) => (
              <option
                key={c}
                value={c}
                style={{
                  backgroundColor: "var(--color-bg)",
                  color: "var(--color-text)",
                }}
              >
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {props.error && (
        <span className="text-[10px] text-red-500">{props.error}</span>
      )}
    </div>
  );
};

export default PriceField;
