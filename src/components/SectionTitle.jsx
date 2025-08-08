import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      when: "beforeChildren",
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function SectionTitle() {
  const title = "Sulthan Dhafir Rafief";

  return (
    <motion.section
      id="title"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="min-h-screen flex items-center justify-center text-center px-4 sm:px-6 md:px-8"
    >
      <div className="w-full max-w-screen-xl">
        <motion.h1
          className="font-playwrite font-bold leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl break-words"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {title.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block mr-2">
              {word.split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
      </div>
    </motion.section>
  );
}