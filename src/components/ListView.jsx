import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.08,
    },
  }),
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const AnimatedListItem = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.a
      ref={ref}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeVariants}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      exit="exit"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-col md:flex-row items-center md:items-center justify-center gap-6 border-b border-border pb-8 hover:pl-1 transition-all duration-300 ease-in-out font-code"
    >
      <div className="hidden md:block md:w-1/3 overflow-hidden rounded-lg shadow-sm">
        <img
          src={item.image}
          alt={item.title}
          className="w-full max-w-[768px] h-auto object-cover"
        />
      </div>
      <div className="w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold group-hover:text-primary transition-colors duration-300 text-foreground">
          {item.title}
        </h2>
        <p className="text-sm text-foreground mb-1 transition-colors duration-300">
          {item.issuer} • <span className="italic">{item.date}</span>
        </p>
        <p className="text-base text-foreground mt-2 transition-colors duration-300">
          {item.description}
        </p>
        <span className="inline-block mt-4 text-sm text-primary underline transition-colors duration-300">
          View Certificate ↗
        </span>
      </div>
    </motion.a>
  );
};

export const ListView = ({ items }) => {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <AnimatedListItem key={item.link} item={item} index={index} />
      ))}
    </div>
  );
};
