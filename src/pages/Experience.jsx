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

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const item = (direction = "left") => ({
  hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
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
    <section className="min-h-screen px-4 py-15 bg-background text-foreground flex flex-col items-center transition-colors duration-300">
      <h1 className="text-3xl md:text-5xl font-bold font-code mb-10 text-center transition-colors duration-300">
        Experience
      </h1>

      <div className="flex flex-wrap gap-2 mb-12 font-code">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelected(tab.value)}
            className={`px-5 py-1.5 rounded-full text-sm sm:text-base border transition-all duration-300 cursor-pointer
              ${
                selected === tab.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-5xl min-h-[300px] px-2 sm:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`line-${selected}`}
            initial={{
              scaleY: 0,
              opacity: 0,
              originY: 0,
            }}
            animate={{
              scaleY: 1,
              opacity: 1,
              originY: 0,
            }}
            exit={{
              scaleY: 0,
              opacity: 0,
              originY: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
            style={{
              height: Math.max(lineHeight, 180)
            }}
            className="absolute left-[22px] transition-colors duration-300 sm:left-1/2 sm:-translate-x-1/2 w-[2px] bg-border dark:border-white/30"
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={firstRender.current ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={firstRender.current ? {} : { opacity: 0 }}
              className="text-center text-muted-foreground mt-4 transition-colors duration-300"
            >
              {selected === "work"
                ? "Still waiting for a job opportunity 🙏"
                : "No experiences yet."}
            </motion.div>
          ) : (
            <motion.div
              key={`content-${selected}`}
              variants={container}
              initial={firstRender.current ? false : "hidden"}
              animate="visible"
              exit={firstRender.current ? {} : "hidden"}
              className="overflow-hidden transition-colors duration-300"
            >
              {filtered.map((exp, i) => {
                const isLeft = isMobile || i % 2 === 0;
                const direction = isLeft ? "left" : "right";
                const icon = icons[exp.icon] || (
                  <Briefcase className="w-5 h-5" />
                );

                return (
                  <motion.div
                    key={i}
                    variants={item(direction)}
                    className={`relative w-full mb-14 flex flex-col sm:flex-row ${
                      isLeft ? "sm:justify-start" : "sm:justify-end"
                    } transition-colors duration-300`}
                  >
                    <div className="absolute left sm:left-1/2 sm:-translate-x-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-4 transition-colors duration-300">
                        {icon}
                      </div>
                    </div>

                    <div
                      className={`
                        bg-card px-4 py-5 rounded-xl shadow-md
                        ml-14 sm:ml-0
                        max-w-[calc(100%-3.5rem)]
                        sm:w-[47%]
                        break-words
                        sm:text-center text-left
                        transition-colors duration-300
                      `}
                    >
                      <h3 className="text-lg font-semibold transition-colors duration-300">
                        {exp.company}
                      </h3>
                      <span className="text-sm text-muted-foreground block transition-colors duration-300">
                        {exp.title} • {exp.year}
                      </span>
                      <p className="mt-2 text-sm transition-colors duration-300">
                        {exp.description}
                      </p>
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
