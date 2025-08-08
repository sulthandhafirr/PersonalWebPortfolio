import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useSectionAnimation from "../hooks/useSectionAnimation";   

export default function AboutSection() {
  const { ref, controls } = useSectionAnimation();

  return (
    <motion.section
      ref={ref}
      id="about"
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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center space-y-6"
    >
      <h1 className="absolute font-extrabold text-foreground/15 leading-none pointer-events-none select-none z-0 whitespace-nowrap
        left-[12%] top-[13%] -translate-y-1/2 rotate-90 origin-left text-[25vw]
        md:rotate-0 md:origin-top-left md:left-0 md:top-10 md:translate-y-0 md:text-[15vw]">
        ABOUT ME.
      </h1>

      <div className="relative z-10 max-w-4xl">
        <p className="font-code text-xl sm:text-2xl md:text-3xl lg:text-3xl leading-relaxed font-medium">
          Hi! I'm Sulthan Dhafir Rafief, an Informatics student passionate about AI/ML, Computer Vision, Data Science, Data Analyst, and Web Development. I enjoy learning new things and exploring technologies to build useful solutions. This portfolio is part of my career journey both for job applications and personal branding.
        </p>
      </div>

      <div className="relative z-10">
        <Link
          to="/about"
          className="border font-code mt-6 inline-block px-6 py-3 rounded-full bg-muted text-foreground text-sm sm:text-base font-medium hover:bg-accent hover:ring-2 hover:ring-primary/50 hover:backdrop-blur-sm hover:scale-[1.03] transition-all duration-300 shadow-sm"
        >
          More About Me
        </Link>
      </div>
    </motion.section>
  );
}