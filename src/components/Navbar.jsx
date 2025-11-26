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
  Menu,
  X,
  Sparkles,
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

export const Navbar = ({ onHireClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <button
                onClick={() => navigate("/")}
                className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity"
              >
                Portfolio.
              </button>
            </motion.div>

            <div className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(item.path)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer
                    ${location.pathname === item.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.label}
                  {location.pathname === item.path ? (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted-foreground/0 group-hover:bg-muted-foreground/30 transition-colors duration-200" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted-foreground/30 opacity-0 hover:opacity-100 transition-opacity duration-200" />
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-foreground hover:bg-accent transition-colors duration-200 cursor-pointer"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40"
              />

              <div className="fixed bottom-24 right-6 z-50 flex flex-col-reverse gap-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: {
                        delay: (index - navItems.length - 1) * 0.05
                        
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0, 
                      y: 20,
                      transition: {
                        delay: (navItems.length - index - 1) * 0.05
                      }
                    }}
                    onClick={() => handleNavigation(item.path)}
                    className={`group relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-200
                      ${location.pathname === item.path
                        ? "bg-foreground text-background scale-110"
                        : "bg-card/90 text-foreground border border-border"
                      }`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={item.label}
                  >
                    {item.icon}
                    <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="fixed bottom-6 right-24 z-50 flex gap-3">
                {/* Hire Me Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0,
                    transition: {
                      delay: 0.15,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0, 
                    x: 20
                  }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onHireClick?.();
                  }}
                  className="group w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Hire Me"
                >
                  <Sparkles size={18} />
                  <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                    Hire Me!
                  </span>
                </motion.button>

                {/* Theme Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0,
                    transition: {
                      delay: 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0, 
                    x: 20
                  }}
                  onClick={toggleTheme}
                  className="group w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-card/90 text-foreground border border-border backdrop-blur-md"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                    Theme
                  </span>
                </motion.button>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:block h-10" />
    </>
  );
};