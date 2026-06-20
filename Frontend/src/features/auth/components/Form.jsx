import InputFiled from "./common/InputFiled";
import SellerCheckbox from "./common/SellerCheckbox";
import ContinueWithGoogle from "./ContinueWithGoogle";
import SubmitBtn from "./common/SubmitBtn";

const Form = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-7">
      {/* Full Name */}
      <InputFiled
        props={{
          label: "Full Name",
          type: "text",
          name: "fullName",
          value: formData.fullName,
          handleChange: handleChange,
          placeholder: "e.g. John Doe",
        }}
      />

      {/* Contact Number */}
      <InputFiled
        props={{
          label: "Contact Number",
          type: "tel",
          name: "contactNumber",
          value: formData.contactNumber,
          handleChange: handleChange,
          placeholder: "+91 98765 43210",
        }}
      />

      {/* Email */}
      <InputFiled
        props={{
          label: "Email Address",
          type: "email",
          name: "email",
          value: formData.email,
          handleChange: handleChange,
          placeholder: "hello@example.com",
        }}
      />

      {/* Password */}
      <InputFiled
        props={{
          label: "Password",
          type: "password",
          name: "password",
          value: formData.password,
          handleChange: handleChange,
          placeholder: "••••••••",
        }}
      />
      {/* Register as Seller — minimal checkbox */}
      <SellerCheckbox
        props={{
          isSeller: formData.isSeller,
          handleChange: handleChange,
        }}
      />

      {/* Sign Up Button */}
      <SubmitBtn />

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px" style={{ backgroundColor: "#e4e2df" }} />
        <span
          className="text-[10px] uppercase tracking-[0.15em]"
          style={{ color: "#B5ADA3" }}
        >
          or
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "#e4e2df" }} />
      </div>

      {/* Google SSO */}
      <ContinueWithGoogle />

      {/* Footer Link */}
      <p className="text-center text-[11px]" style={{ color: "#B5ADA3" }}>
        Already have an account?{" "}
        <a
          href="/login"
          className="transition-colors duration-200"
          style={{
            color: "#7A6E63",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#C9A96E")}
          onMouseLeave={(e) => (e.target.style.color = "#7A6E63")}
        >
          Sign in
        </a>
      </p>
    </form>
  );
};

export default Form;
