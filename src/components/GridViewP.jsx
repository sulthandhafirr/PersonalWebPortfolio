import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: i * 0.05,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const AnimatedCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <motion.a
      ref={ref}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-xl overflow-hidden shadow-md border border-border bg-background transition-colors duration-300 font-code group h-[250px] flex flex-col justify-end"
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute top-0 left-0 w-full h-auto object-cover object-top pointer-events-none select-none"
      />
      <div className="absolute bottom-0 w-full px-3 py-4 bg-background bg-opacity-60 backdrop-blur-sm transition-colors duration-300">
        <h3 className="text-sm font-semibold text-foreground truncate transition-colors duration-300">
        {item.title}
        </h3>
        <p className="text-xs text-foreground truncate transition-colors duration-300">
        {item.tech} • <span className="italic">{item.year}</span>
        </p>
      </div>
    </motion.a>
  );
};

export const GridView = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <AnimatedCard key={item.link} item={item} index={index} />
      ))}
    </div>
  );
};
