import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import LeftSide from "../components/LeftSide";
import SubmitBtn from "../components/common/SubmitBtn";
import Toast from "../../../shared/Toast";
import ThemeToggle from "../../../shared/ThemeToggle";
import { useAuth } from "../hook/useAuth";
import InputFiled from "../components/common/InputFiled";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const { handleResetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setToast({
        message: "Password must be at least 6 characters",
        type: "error",
      });
      return;
    }
    if (password !== confirmPassword) {
      setToast({ message: "Passwords don't match", type: "error" });
      return;
    }

    const result = await handleResetPassword({ token, password });
    if (result.success) {
      setToast({
        message: "Password reset! Redirecting to login...",
        type: "success",
      });
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setToast({
        message: result.error || "This reset link is invalid or has expired",
        type: "error",
      });
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col lg:flex-row selection:bg-(--color-accent)/30"
      style={{
        backgroundColor: "var(--color-bg)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <LeftSide mode="forgot" />

      <div
        className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-8 sm:px-14 lg:px-20 py-5 md:py-8 overflow-y-auto"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-4">
            <span
              className="text-sm tracking-[0.35em] uppercase"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--color-accent)",
              }}
            >
              Snitch.
            </span>
          </div>

          <div className="mb-4 md:mb-7">
            <p
              className="text-[10px] uppercase tracking-[0.22em] mb-4 font-medium"
              style={{ color: "var(--color-accent)" }}
            >
              Almost done
            </p>
            <h1
              className="text-[2.6rem] xl:text-5xl font-light leading-[1.1]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--color-text)",
              }}
            >
              New Password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputFiled
              props={{
                label: "New Password",
                type: "password",
                name: "password",
                value: password,
                handleChange: (e) => setPassword(e.target.value),
                placeholder: "At least 6 characters",
                minLength: 6,
              }}
            />

            <InputFiled
              props={{
                label: "Confirm Password",
                type: "password",
                name: "password",
                value: confirmPassword,
                handleChange: (e) => setConfirmPassword(e.target.value),
                placeholder: "Re-enter password",
                minLength: 6,
              }}
            />

            <SubmitBtn label="Reset Password" isLoading={loading} />

            <p
              className="text-center text-[11px]"
              style={{ color: "var(--color-muted-light)" }}
            >
              <Link
                to="/login"
                className="underline"
                style={{ color: "var(--color-accent)" }}
              >
                Back to Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
