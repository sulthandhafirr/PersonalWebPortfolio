import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  IdCardLanyard,
  Library,
  Sparkle,
  UserRoundPen,
  FileBadge,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { path: "/", icon: <Home size={18} />, label: "Home" },
  { path: "/about", icon: <IdCardLanyard size={18} />, label: "About" },
  { path: "/projects", icon: <Library size={18} />, label: "Projects" },
  { path: "/experience", icon: <Sparkle size={18} />, label: "Experience" },
  { path: "/certificates", icon: <FileBadge size={18} />, label: "Certificates" },
  { path: "/contact", icon: <UserRoundPen size={18} />, label: "Contact" },
];

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Theme setup
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Footer intersection check
  useEffect(() => {
    const footer = document.querySelector("footer");

    // Cek apakah path saat ini adalah halaman yang mengandung footer
    const isFooterPage = location.pathname === "/";

    if (!isFooterPage || !footer) {
      setIsAtFooter(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(false);
        setTimeout(() => {
          setIsAtFooter(entry.isIntersecting);
          setVisible(true);
        }, 200);
      },
      { threshold: 0.5 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, [location.pathname]);
 // ✅ re-run on path change

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={isAtFooter ? "vertical" : "horizontal"}
          initial={{
            opacity: 0,
            x: isAtFooter ? 100 : 0,
            y: isAtFooter ? 0 : 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
              duration: 0.35,
              ease: "easeOut",
            },
          }}
          exit={{
            opacity: 0,
            x: isAtFooter ? 0 : 100,
            y: isAtFooter ? 100 : 0,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          }}
          className={`fixed z-50 
            ${isAtFooter
              ? "top-1/2 right-4 -translate-y-1/2 flex-col"
              : "bottom-4 left-1/2 -translate-x-1/2 flex-row"
            }
            bg-card backdrop-blur-md px-3 py-2 rounded-full
            items-center gap-2 shadow-md border border-border 
            flex transition-all duration-500`}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center 
                         rounded-full p-2 cursor-pointer transition-all duration-300 
                         text-foreground"
              aria-label={item.label}
            >
              <div className="relative z-10">{item.icon}</div>
              <span
                className={`absolute text-xs text-white bg-black px-2 py-1 rounded z-50 whitespace-nowrap
                  transition-all duration-200 scale-0 group-hover:scale-100
                  ${isAtFooter
                    ? "right-full mr-2 top-1/2 -translate-y-1/2 text-left"
                    : "bottom-full mb-1 left-1/2 -translate-x-1/2 text-center"
                  }`}
              >
                {item.label}
              </span>
            </motion.button>
          ))}

          {/* Theme toggle button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative p-2 rounded-full text-foreground transition-all duration-300 cursor-pointer"
            aria-label="Toggle theme"
          >
            <div className="relative z-10">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            <span
              className={`absolute text-xs text-white bg-black px-2 py-1 rounded z-50 whitespace-nowrap
                transition-all duration-200 scale-0 group-hover:scale-100
                ${isAtFooter
                  ? "right-full mr-2 top-1/2 -translate-y-1/2 text-left"
                  : "bottom-full mb-1 left-1/2 -translate-x-1/2 text-center"
                }`}
            >
              Theme
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};