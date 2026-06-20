import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import Form from "./Form";

const headerContent = {
  register: {
    tag: "Welcome to Snitch",
    heading: "Elevate Your Style",
  },
  login: {
    tag: "Good to see you",
    heading: "Welcome Back",
  },
};

const RightSide = ({ mode = "register" }) => {
  const { handleRegister, handleLogin } = useAuth();
  const navigate = useNavigate();
  const content = headerContent[mode];

  const [formData, setFormData] = useState(
    mode === "register"
      ? {
          fullName: "",
          contactNumber: "",
          email: "",
          password: "",
          isSeller: false,
        }
      : { email: "", password: "" },
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "register") {
      const result = await handleRegister({
        email: formData.email,
        contact: formData.contactNumber.replace(/^\+91/, "").trim(),
        password: formData.password,
        fullname: formData.fullName,
        isSeller: formData.isSeller,
      });
      if (result?.success) navigate("/");
    } else {
      const result = await handleLogin({
        email: formData.email,
        password: formData.password,
      });
      if (result?.success) navigate("/");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <div
        className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-8 sm:px-14 lg:px-20 py-5 md:py-8 overflow-y-auto"
        style={{ backgroundColor: "#fbf9f6" }}
      >
        <div className="w-full max-w-sm">
          {/* Mobile brand mark */}
          <div className="lg:hidden mb-4">
            <span
              className="text-sm tracking-[0.35em] uppercase"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#C9A96E",
              }}
            >
              Snitch.
            </span>
          </div>

          {/* Header */}
          <div className="mb-4 md:mb-7">
            <p
              className="text-[10px] uppercase tracking-[0.22em] mb-4 font-medium"
              style={{ color: "#C9A96E" }}
            >
              {content.tag}
            </p>
            <h1
              className="text-[2.6rem] xl:text-5xl font-light leading-[1.1]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#1b1c1a",
              }}
            >
              {content.heading}
            </h1>
          </div>

          {/* Form */}
          <Form
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            mode={mode}
          />
        </div>
      </div>
    </>
  );
};

export default RightSide;
