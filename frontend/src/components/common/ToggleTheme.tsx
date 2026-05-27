import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../types/store/theme.store";


function ThemeToggle() {

  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="
      p-2
      rounded-lg
      border
      dark:border-gray-700
      transition-colors
      duration-300
      "
    >
      {theme === "light" ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
}

export default ThemeToggle;