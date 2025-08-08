import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const ThemeToggle = ({ small = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (storedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "rounded-full transition-colors duration-300",
        "bg-transparent text-foreground hover:scale-110 p-2"
      )}
    >
      {isDarkMode ? (
        <Sun className={small ? "w-4 h-4" : "w-6 h-6"} />
      ) : (
        <Moon className={small ? "w-4 h-4" : "w-6 h-6"} />
      )}
    </button>
  );
};
