const SubmitBtn = ({ label = "Submit", isLoading = false }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 disabled:opacity-60"
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
      {isLoading ? "Please wait..." : label}
    </button>
  );
};

export default SubmitBtn;
