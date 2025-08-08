import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeSlide = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const pulseBounce = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const NotFound = () => {
  return (
    <motion.div
      className="flex items-center justify-center h-screen w-full bg-background text-foreground px-6 sm:px-10 lg:px-16 transition-colors duration-300"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center max-w-2xl" variants={container}>
        <motion.h1
          variants={fadeSlide}
          className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-primary mb-4 animate-bounce"
        >
          404
        </motion.h1>

        <motion.h2
          className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2"
          variants={fadeSlide}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-sm sm:text-base lg:text-lg text-muted mb-6"
          variants={fadeSlide}
        >
          The page you're looking for doesn’t exist or has been moved.
          Please check the URL or go back to the homepage.
        </motion.p>

        <motion.div variants={fadeSlide}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:text-base rounded-xl font-medium bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white opacity-10 animate-ping rounded-xl z-0" />
            <span className="relative z-10 flex items-center">
              <ArrowLeft size={20} />
              Back to Home
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
