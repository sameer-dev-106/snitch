import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputFiled = ({ props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === "password";

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

      {/* Wrapper for input + eye icon */}
      <div className="relative flex items-center">
        <input
          className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300 pr-8"
          id={`reg-${props.name}`}
          type={isPassword ? (showPassword ? "text" : "password") : props.type}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
          required
          placeholder={props.placeholder}
          minLength={props.minLength}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Eye toggle — sirf password field pe */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-0 bottom-3 focus:outline-none"
            style={{ color: "#B5ADA3" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#B5ADA3")}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputFiled;
