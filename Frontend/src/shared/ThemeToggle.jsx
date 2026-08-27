import { useTheme } from "./useTheme.jsx";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="flex items-center justify-center w-8 h-8 rounded-full transition-opacity hover:opacity-70"
      style={{ color: "var(--color-text)" }}
    >
      <span className="text-base leading-none">{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
};

export default ThemeToggle;
