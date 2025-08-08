import { motion } from "framer-motion";
import { aboutData } from "../hooks/about";
import { Download, Mail, Github, Linkedin, Phone } from "lucide-react";

export const About = () => {
  const { description, skills, interests } = aboutData;

  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const socialCards = [
    {
      label: "Download CV",
      href: "/about/CV.pdf",
      icon: <Download className="w-6 h-6 mb-2 text-primary" />,
      download: true,
    },
    {
      label: "Gmail",
      href: "mailto:sulthandrwrk@gmail.com",
      icon: <Mail className="w-6 h-6 mb-2 text-primary" />,
    },
    {
      label: "GitHub",
      href: "https://github.com/sulthandhafirr",
      icon: <Github className="w-6 h-6 mb-2 text-primary" />,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/sulthandhafirrafief",
      icon: <Linkedin className="w-6 h-6 mb-2 text-primary" />,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/6285817516675",
      icon: <Phone className="w-6 h-6 mb-2 text-primary" />,
    },
  ];

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 transition-colors duration-300"
    >
      {/* Profile & Description */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start"
        variants={containerVariants}
      >
        {/* Profile Image */}
        <motion.div
          className="bg-card rounded-2xl shadow-md p-6 flex justify-center items-center h-full transition-colors duration-300"
          variants={itemVariants}
        >
          <motion.img
            src="/about/SulthanDR.jpg"
            alt="Profile"
            className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Description */}
        <motion.div
          className="font-code bg-card rounded-2xl shadow-md p-4 sm:p-6 md:p-10 text-center md:text-left md:col-span-3 transition-colors duration-300 h-full"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Hi, I'm Rafief 👋</h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base transition-colors duration-300">
            {description}
          </p>
        </motion.div>
      </motion.div>

      {/* Skills and Interests */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 font-code"
        variants={containerVariants}
      >
        {/* Skills */}
        <motion.div
          className="bg-card rounded-2xl shadow-md p-4 sm:p-6 h-full transition-colors duration-300"
          variants={itemVariants}
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Skills and Tools</h3>
          <div className="relative overflow-hidden w-full">
            <div className="flex gap-6 animate-scroll-loop w-max">
              {[...skills, ...skills].map((icon, index) => {
                const name = icon.replace(".svg", "");
                return (
                  <div
                    key={index}
                    className="group relative flex flex-col items-center min-w-[60px]"
                  >
                    <img
                      src={`/about/${icon}`}
                      alt={name}
                      className="h-15 w-15 object-contain grayscale group-hover:grayscale-0 transition"
                    />
                    <span className="absolute bottom-[-1.8rem] opacity-0 group-hover:opacity-100 text-xs bg-muted text-foreground px-2 py-1 rounded shadow transition duration-300">
                      {name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          className="bg-card rounded-2xl shadow-md p-4 sm:p-6 h-full transition-colors duration-300 flex flex-col items-center"
          variants={itemVariants}
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Interests</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((item, index) => (
              <span
                key={index}
                className="border border-border dark:border-white/10 font-code inline-block px-4 py-2 rounded-full bg-muted text-foreground text-sm sm:text-base hover:bg-accent hover:ring-2 hover:ring-primary/50 hover:backdrop-blur-sm hover:scale-[1.03] transition-all duration-300 shadow-sm dark:bg-muted/20 dark:text-foreground/90"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

      </motion.div>

      {/* Social Cards */}
      <motion.div variants={containerVariants}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 font-code">
          {socialCards.map(({ label, href, icon, download }, index) => (
            <motion.div
              key={index}
              className={`
                bg-card rounded-xl shadow-md p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer text-center
                ${label === "Download CV" ? "col-span-2 sm:col-span-2 md:col-span-1" : ""}
              `}
              variants={itemVariants}
            >
              <a
                href={href}
                {...(download ? { download: true } : {})}
                target={download ? "_self" : "_blank"}
                rel="noreferrer"
                className="flex flex-col items-center"
              >
                {icon}
                <span className="text-sm font-medium">{label}</span>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>


    </motion.section>
  );
};
