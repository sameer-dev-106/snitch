const TextareaField = ({props}) => {
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
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`cp-${props.name}`}
        className="text-[10px] uppercase tracking-[0.2em] font-medium"
        style={{ color: "var(--color-border)" }}
      >
        {props.label}
      </label>
      <textarea
        id={`cp-${props.name}`}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        rows={5}
        placeholder={props.placeholder}
        className="w-full bg-transparent outline-none py-4 text-sm transition-colors duration-300 resize-none leading-relaxed placeholder:text-(--color-muted)"
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default TextareaField