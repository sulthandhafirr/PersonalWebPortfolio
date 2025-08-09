import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LayoutList, Grid3X3 } from "lucide-react";
import { ListView } from "../components/ListView";
import { GridView } from "../components/GridView";
import { certificates } from "../hooks/certificates";

export const Certificates = () => {
  const [viewMode, setViewMode] = useState("list");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <motion.section
      ref={sectionRef}
      id="certificates"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-6 sm:px-10 md:px-20 lg:px-32 py-15 pb-20 bg-background text-foreground transition-colors duration-300 ease-in-out"
    >
      <div className="flex flex-wrap justify-between items-center gap-4 mb-16 sm:mb-20 font-code">
        <h1 className="text-3xl md:text-5xl font-bold">Certifications</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-full hover:bg-muted hover:scale-105 transition cursor-pointer ${
              viewMode === "list" ? "bg-muted ring-2 ring-primary" : ""
            }`}
          >
            <LayoutList className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-full hover:bg-muted hover:scale-105 transition cursor-pointer ${
              viewMode === "grid" ? "bg-muted ring-2 ring-primary" : ""
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {viewMode === "list" ? (
          <ListView items={certificates} />
        ) : (
          <GridView items={certificates} />
        )}
      </AnimatePresence>
    </motion.section>
  );
}