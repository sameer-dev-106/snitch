import InputFiled from "./common/InputFiled";
import SellerCheckbox from "./common/SellerCheckbox";
import ContinueWithGoogle from "./common/ContinueWithGoogle";
import SubmitBtn from "./common/SubmitBtn";
import { Link } from "react-router";

const Form = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  mode = "register",
}) => {
  const isRegister = mode === "register";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-7">
      {isRegister && (
        <InputFiled
          props={{
            label: "Full Name",
            type: "text",
            name: "fullName",
            value: formData.fullName,
            handleChange,
            placeholder: "e.g. John Doe",
          }}
        />
      )}

      {isRegister && (
        <InputFiled
          props={{
            label: "Contact Number",
            type: "tel",
            name: "contactNumber",
            value: formData.contactNumber,
            handleChange,
            placeholder: "98765 43210",
          }}
        />
      )}

      <InputFiled
        props={{
          label: "Email Address",
          type: "email",
          name: "email",
          value: formData.email,
          handleChange,
          placeholder: "hello@example.com",
        }}
      />

      {/* Password — eye toggle InputFiled ke andar handle hoga */}
      <InputFiled
        props={{
          label: "Password",
          type: "password",
          name: "password",
          value: formData.password,
          handleChange,
          placeholder: "Min. 6 characters",
          minLength: 6,
        }}
      />

      {isRegister && (
        <SellerCheckbox
          props={{
            isSeller: formData.isSeller,
            handleChange,
          }}
        />
      )}

      <SubmitBtn
        label={isRegister ? "Sign Up" : "Sign In"}
        isLoading={isLoading}
      />

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px" style={{ backgroundColor: "#e4e2df" }} />
        <span
          className="text-[10px] uppercase tracking-[0.15em]"
          style={{ color: "var(--color-muted)" }}
        >
          or
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "#e4e2df" }} />
      </div>

      <ContinueWithGoogle />

      <p className="text-center text-[11px]" style={{ color: "#B5ADA3" }}>
        {isRegister ? (
          <>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--color-muted)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "var(--color-muted)")
              }
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--color-muted)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "var(--color-muted)")
              }
            >
              Sign up
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default Form;
