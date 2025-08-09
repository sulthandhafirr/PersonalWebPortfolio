import { motion } from "framer-motion";
import { Wrench, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const Maintenance = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="w-full h-screen flex flex-col items-center justify-center px-4 text-center bg-background text-foreground transition-colors duration-300"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeIn}
    >
      <Wrench className="w-16 h-16 text-yellow-500 mb-4 animate-spin-slow" />

      <h1 className="text-3xl md:text-4xl font-semibold font-code mb-2">
        Page Under Maintenance
      </h1>

      <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-md">
        Currently working on this page to make it even better. Please check back soon!
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="cursor-pointer flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-full font-medium shadow hover:shadow-md transition"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </motion.button>
    </motion.section>
  );
};
