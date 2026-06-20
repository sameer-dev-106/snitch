const InputFiled = ({ props }) => {

      const inputStyle = {
        color: "#1b1c1a",
        borderBottom: "1px solid #d0c5b5",
        fontFamily: "'Inter', sans-serif",
      };

      const handleFocus = (e) => {
        e.target.style.borderBottomColor = "#C9A96E";
      };
      const handleBlur = (e) => {
        e.target.style.borderBottomColor = "#d0c5b5";
      };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`reg-${props.name}`}
        className="text-[10px] uppercase tracking-[0.18em] font-medium"
        style={{ color: "#7A6E63" }}
      >
        {props.label}
      </label>
      <input
        className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300"
        id={`reg-${props.name}`}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        required
        placeholder={props.placeholder}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default InputFiled;
