import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useSectionAnimation from "../hooks/useSectionAnimation";
import { projects as allProjects } from "../hooks/projects";

export default function ProjectsSection() {
  const { ref, controls } = useSectionAnimation();

  const topProjects = allProjects.slice(0, 3); 

  return (
    <motion.section
      ref={ref}
      id="projects"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      initial="hidden"
      animate={controls}
      className="relative w-full px-6 sm:px-10 md:px-20 lg:px-32 py-24 bg-background text-left overflow-hidden transition-colors duration-300"
    >
      <h1 className="absolute font-extrabold text-foreground/15 leading-none pointer-events-none select-none z-0 whitespace-nowrap
        left-[12%] top-[13%] -translate-y-1/2 rotate-90 origin-left text-[25vw]
        md:rotate-0 md:origin-top-left md:left-0 md:top-8 md:translate-y-0 md:text-[15vw]">
        PROJECTS.
      </h1>

      <div className="relative z-10 space-y-10 pt-16 font-code">
        {topProjects.map((project, idx) => (
          <a
            key={idx}
            href={project.href}
            className="block border-b border-border pb-6 group transition-transform hover:pl-1"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h2>
            <p className="text-foreground text-sm mt-1">
              {project.description}
            </p>
          </a>
        ))}

        <div className="pt-4">
          <Link
            to="/projects"
            className="border font-code inline-block px-6 py-3 rounded-full bg-muted text-foreground text-sm sm:text-base font-medium hover:bg-accent hover:ring-2 hover:ring-primary/50 hover:backdrop-blur-sm hover:scale-[1.03] transition-all duration-300 shadow-sm"
          >
            See More Projects
          </Link>
        </div>
      </div>
    </motion.section>
  );
}