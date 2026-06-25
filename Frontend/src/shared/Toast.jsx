import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

const Toast = ({ message, type = "error", onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10);

    const hide = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [duration, message, onClose]);

  const isError = type === "error";

  return (
    <div
      className={`fixed top-5 left-1/2 z-9999 flex items-center gap-2.5 px-4 py-3 rounded-xl max-w-105 w-[calc(100vw-40px)] backdrop-blur-[10px] transition-all duration-300 ease-in-out
  ${visible ? "opacity-100 -translate-x-1/2 translate-y-0" : "opacity-0 -translate-x-1/2 -translate-y-5"}
  ${
    isError
      ? "bg-[#1e0a0a] border border-[rgba(243,57,57,0.4)] shadow-[0_4px_24px_rgba(243,57,57,0.15)]"
      : "bg-[#0a1e0e] border border-[rgba(34,197,94,0.4)] shadow-[0_4px_24px_rgba(34,197,94,0.15)]"
  }`}
    >
      {isError ? (
        <XCircle size={18} style={{ color: "#f33939", flexShrink: 0 }} />
      ) : (
        <CheckCircle size={18} style={{ color: "#22c55e", flexShrink: 0 }} />
      )}

      <span
        style={{
          color: isError ? "#f09090" : "#86efac",
          fontSize: "14px",
          fontFamily: "'Geist', system-ui, sans-serif",
          flex: 1,
          lineHeight: 1.4,
        }}
      >
        {message}
      </span>

      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: isError ? "rgba(240,144,144,0.5)" : "rgba(134,239,172,0.5)",
          padding: "2px",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
