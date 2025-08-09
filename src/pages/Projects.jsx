import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LayoutList, Grid3X3 } from "lucide-react";
import { ListView } from "../components/ListViewP";
import { GridView } from "../components/GridViewP";
import { projects } from "../hooks/projects";

const allCategories = ["All", "Web Development", "AI/ML", "Data Analysis"];

export const Projects = () => {
  const [viewMode, setViewMode] = useState("list");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-6 sm:px-10 md:px-20 lg:px-32 py-15 bg-background text-foreground transition-colors duration-500"
    >
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10 font-code">
        <h1 className="text-3xl md:text-5xl font-bold">Projects</h1>
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

      <div className="flex flex-wrap gap-2 mb-12 font-code text-foreground">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-1.5 rounded-full text-sm sm:text-base border transition-all duration-300 cursor-pointer
              ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {viewMode === "list" ? (
            <motion.div key={`list-${selectedCategory}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ListView items={filteredProjects} />
            </motion.div>
        ) : (
            <motion.div key={`grid-${selectedCategory}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GridView items={filteredProjects} />
            </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};