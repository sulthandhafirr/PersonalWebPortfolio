import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


export const Contact = () => {
  const socialMedia = [
    {
      icon: <Mail className="w-10 h-10" />,
      link: "mailto:sulthandrwrk@gmail.com",
      label: "Email",
    },
    {
      icon: <Phone className="w-10 h-10" />,
      link: "https://wa.me/6285817516675",
      label: "Whatsapp",
    },
    {
      icon: <Github className="w-10 h-10" />,
      link: "https://github.com/sulthandhafirr",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-10 h-10" />,
      link: "https://linkedin.com/in/sulthandhafirrafief",
      label: "LinkedIn",
    },
  ];

  return (
    <motion.section
      id="contact"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="w-full min-h-screen flex flex-col items-center px-6 py-15 bg-muted/40 dark:bg-background transition-colors duration-300"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }} 
        className="text-4xl md:text-5xl font-bold mb-8 md:mb-5 font-code text-center text-foreground"
      >
        Get in Touch.
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-xl">
        {socialMedia.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="aspect-square w-full border flex flex-col items-center justify-center text-center rounded-xl p-4 text-foreground bg-muted-background shadow-md hover:shadow-md transition-all"
          >
            <div className="mb-2">{item.icon}</div>
            <span className="text-sm">{item.label}</span>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
};
