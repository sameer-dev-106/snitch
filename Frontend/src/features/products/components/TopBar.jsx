import { useNavigate } from "react-router";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-10 pb-0 flex items-center gap-5">
      <button
        onClick={() => navigate(-1)}
        className="text-lg transition-colors duration-200 leading-none"
        style={{ color: "#B5ADA3" }}
        aria-label="Go back"
        onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#B5ADA3")}
      >
        ←
      </button>
      <span
        className="text-xs font-medium tracking-[0.32em] uppercase"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "#C9A96E",
        }}
      >
        Snitch.
      </span>
    </div>
  );
};

export default TopBar;
