import { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import LeftSide from "../components/LeftSide";
import SubmitBtn from "../components/common/SubmitBtn";
import Toast from "../../../shared/Toast";
import ThemeToggle from "../../../shared/ThemeToggle";
import { useAuth } from "../hook/useAuth";

const ForgotPassword = () => {
  const loading = useSelector((state) => state.auth.loading);
  const { handleForgetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleForgetPassword({ email });
    if (result.success) {
      setSent(true);
    } else {
      setToast({
        message: result.error || "Something went wrong. Try again.",
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
              Reset Password
            </p>
            <h1
              className="text-[2.6rem] xl:text-5xl font-light leading-[1.1]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--color-text)",
              }}
            >
              Forgot Password
            </h1>
          </div>

          {sent ? (
            <div className="space-y-6">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                If an account exists for <strong>{email}</strong>, we've sent
                a password reset link to that inbox. It's valid for 1 hour.
              </p>
              <Link
                to="/login"
                className="inline-block text-[11px] uppercase tracking-[0.15em] font-medium"
                style={{ color: "var(--color-accent)" }}
              >
                &larr; Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-[11px] uppercase tracking-[0.15em] mb-2"
                  style={{ color: "var(--color-muted)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-b py-3 text-sm focus:outline-none"
                  style={{
                    borderColor: "var(--color-outline-variant)",
                    color: "var(--color-text)",
                  }}
                />
              </div>

              <SubmitBtn label="Send Reset Link" isLoading={loading} />

              <p
                className="text-center text-[11px]"
                style={{ color: "var(--color-muted-light)" }}
              >
                Remembered your password?{" "}
                <Link
                  to="/login"
                  className="underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  Sign In
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
