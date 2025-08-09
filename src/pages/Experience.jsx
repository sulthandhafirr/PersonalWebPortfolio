import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Users, HeartHandshake } from "lucide-react";
import { experienceData } from "../hooks/experience";

const icons = {
  briefcase: <Briefcase className="w-5 h-5" />,
  graduationCap: <GraduationCap className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  heartHandshake: <HeartHandshake className="w-5 h-5" />,
};

const tabs = [
  { label: "Work", value: "work" },
  { label: "Education", value: "education" },
  { label: "Organization", value: "organization" },
  { label: "Volunteer", value: "volunteer" },
];

// Container untuk stagger animation
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

// Item animation
const item = (direction = "left") => ({
  hidden: { opacity: 0, x: direction === "left" ? -40 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.25 } },
});

export const Experience = () => {
  const [selected, setSelected] = useState("work");
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  if (!hasMounted) return null;

  const filtered = experienceData.filter((d) => d.category === selected);
  const lineHeight = filtered.length * 180;

  return (
    <section className="min-h-screen px-4 py-15 bg-background text-foreground flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-bold font-code mb-10 text-center"
      >
        Experience
      </motion.h1>


      {/* Tab Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }} 
        className="flex flex-wrap gap-2 mb-12 font-code">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelected(tab.value)}
            className={`px-5 py-1.5 rounded-full text-sm sm:text-base border cursor-pointer
              ${
                selected === tab.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative w-full max-w-5xl min-h-[300px] px-2 sm:px-0">
        {/* Vertical Line */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`line-${selected}`}
            initial={{ scaleY: 0, opacity: 0, originY: 0 }}
            animate={{ scaleY: 1, opacity: 1, originY: 0 }}
            exit={{ scaleY: 0, opacity: 0, originY: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ height: Math.max(lineHeight, 180) }}
            className="absolute left-[22px] sm:left-1/2 sm:-translate-x-1/2 w-[2px] bg-border dark:bg-muted/40"
          />
        </AnimatePresence>

        {/* Content */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center text-muted-foreground mt-4"
            >
              {selected === "work"
                ? "Still waiting for a job opportunity 🙏"
                : "No experiences yet."}
            </motion.div>
          ) : (
            <motion.div
              key={`content-${selected}`}
              variants={container}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="overflow-hidden"
            >
              {filtered.map((exp, i) => {
                const isLeft = isMobile || i % 2 === 0;
                const direction = isLeft ? "left" : "right";
                const icon = icons[exp.icon] || <Briefcase className="w-5 h-5" />;

                return (
                  <motion.div
                    key={i}
                    variants={item(direction)}
                    className={`relative w-full mb-14 flex flex-col sm:flex-row ${
                      isLeft ? "sm:justify-start" : "sm:justify-end"
                    }`}
                  >
                    {/* Icon */}
                    <div className="absolute left sm:left-1/2 sm:-translate-x-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background">
                        {icon}
                      </div>
                    </div>

                    {/* Card */}
                    <div
                      className={`bg-card px-4 py-5 rounded-xl shadow-md
                        ml-14 sm:ml-0
                        max-w-[calc(100%-3.5rem)]
                        sm:w-[47%]
                        break-words
                        sm:text-center text-left`}
                    >
                      <h3 className="text-lg font-semibold">{exp.company}</h3>
                      <span className="text-sm text-muted-foreground block">
                        {exp.title} • {exp.year}
                      </span>
                      <p className="mt-2 text-sm">{exp.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
