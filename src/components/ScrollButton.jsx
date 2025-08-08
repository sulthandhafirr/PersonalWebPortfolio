import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollButton() {
  const [isAtTitle, setIsAtTitle] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const titleEl = document.getElementById("title");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtTitle(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (titleEl) {
      titleRef.current = titleEl;
      observer.observe(titleEl);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    const aboutEl = document.getElementById("about");
    if (aboutEl) {
      const yOffset = -80; // Offset agar tidak terlalu mepet atas
      const y =
        aboutEl.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isAtTitle && (
        <motion.button
            key="scroll-down"
            onClick={handleClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed z-50 bottom-20 left-1/2 -translate-x-1/2 p-3 rounded-full bg-muted text-foreground shadow-md
                        hover:bg-accent hover:ring-2 hover:ring-primary/50 hover:scale-[1.05] transition-all duration-300 cursor-pointer"
            aria-label="Scroll to About Section"
            >
            <ChevronDown className="w-5 h-5 animate-bounce" />
            </motion.button>
      )}
    </AnimatePresence>
  );
}