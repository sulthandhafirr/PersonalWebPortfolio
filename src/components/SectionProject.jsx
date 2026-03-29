import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useSectionAnimation from "../hooks/useSectionAnimation";
import { projects as allProjects } from "../hooks/projects";

export default function ProjectsSection() {
  const { ref, controls } = useSectionAnimation();
  const sliderRef = useRef(null);

  const topProjects = allProjects.slice(0, 3);
  const previewCards = [...topProjects, { type: "see-more" }];
  const loopCards = [...previewCards, ...previewCards];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let frameId;
    let isPaused = false;

    const animateScroll = () => {
      if (!isPaused) {
        const halfTrackWidth = slider.scrollWidth / 2;

        slider.scrollLeft += 0.6;

        // Jump to the same visual position in the first half for a seamless loop.
        if (slider.scrollLeft >= halfTrackWidth) {
          slider.scrollLeft -= halfTrackWidth;
        }
      }

      frameId = requestAnimationFrame(animateScroll);
    };

    const pause = () => {
      isPaused = true;
    };

    const resume = () => {
      isPaused = false;
    };

    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);
    slider.addEventListener("touchstart", pause, { passive: true });
    slider.addEventListener("touchend", resume);

    frameId = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(frameId);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
      slider.removeEventListener("touchstart", pause);
      slider.removeEventListener("touchend", resume);
    };
  }, []);

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

      <div className="relative z-10 pt-16 font-code">
        <div
          ref={sliderRef}
          className="-mx-1 flex gap-5 overflow-x-auto px-1 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopCards.map((item, idx) => {
            if (item.type === "see-more") {
              return (
                <Link
                  key={`see-more-${idx}`}
                  to="/projects"
                  className="group min-w-[85%] sm:min-w-[65%] lg:min-w-[38%] rounded-2xl border border-dashed border-border/80 bg-background/40 p-5 sm:p-6 flex items-center justify-center text-center transition-all duration-300 hover:border-primary/60 hover:bg-accent/20"
                >
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-foreground/65">
                      End Of Preview
                    </p>
                    <p className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      See More Projects
                    </p>
                  </div>
                </Link>
              );
            }

            return (
              <motion.a
                key={`${item.title}-${idx}`}
                href={item.link || "#"}
                target={item.link ? "_blank" : undefined}
                rel={item.link ? "noreferrer" : undefined}
                initial={{ opacity: 0, x: 36 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, x: 36 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: "easeOut",
                    },
                  },
                }}
                className="group min-w-[85%] sm:min-w-[65%] lg:min-w-[38%] rounded-2xl border border-border/80 bg-muted/30 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-accent/30"
              >
                <div className="mb-4 overflow-hidden rounded-xl border border-border/70 bg-background/60">
                  <img
                    src={`/${item.image}`}
                    alt={item.title}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-primary/80">
                    {item.category}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-foreground/85">{item.description}</p>
                  <p className="text-xs text-foreground/70">{item.tech}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}