import { useTheme } from "../app/useTheme.jsx";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border px-3 py-2 bg-white dark:bg-[#0f0f0f] border-gray-200 dark:border-gray-500 text-gray-700 dark:text-gray-100 shadow-md hover:shadow-lg transition-colors duration-200"
    >
      <span className="text-base leading-none">{isDark ? "🌙" : "☀️"}</span>
      <span className="text-xs font-medium hidden sm:inline">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeToggle;
