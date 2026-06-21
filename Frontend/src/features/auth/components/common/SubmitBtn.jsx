const SubmitBtn = ({ label = "Sign Up" }) => {
  return (
    <button
      type="submit"
      className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
      style={{
        backgroundColor: "var(--color-text)",
        color: "var(--color-bg)",
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-muted)";
        e.currentTarget.style.color = "var(--color-text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-text)";
        e.currentTarget.style.color = "var(--color-bg)";
      }}
    >
      {label}
    </button>
  );
};

export default SubmitBtn;
