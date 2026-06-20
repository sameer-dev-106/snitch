

const SubmitBtn = () => {
  return (
    <button
      type="submit"
      className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
      style={{
        backgroundColor: "#1b1c1a",
        color: "#fbf9f6",
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#C9A96E";
        e.currentTarget.style.color = "#1b1c1a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#1b1c1a";
        e.currentTarget.style.color = "#fbf9f6";
      }}
    >
      Sign Up
    </button>
  );
}

export default SubmitBtn