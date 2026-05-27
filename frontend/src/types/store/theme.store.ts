import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;

    toggleTheme: () => void;

    initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    theme: "light",

    toggleTheme: () => {
        const currentTheme = get().theme;

        const newTheme = currentTheme === "light" ? "dark" : "light";

        set({
            theme: newTheme,
        });

        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    },

    initializeTheme: () => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;

        const theme = savedTheme || "light";

        set({
            theme,
        });

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    },
}));