import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import AboutSection from "../components/SectionAbout";
import ProjectsSection from "../components/SectionProject";
import FooterSection from "../components/SectionFooter";
import ScrollButton from "../components/ScrollButton";


export const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main className="flex flex-col justify-between min-h-screen text-foreground bg-background transition-colors duration-300 scroll-smooth">
      <SectionTitle />
      <AboutSection />
      <ProjectsSection />
      <FooterSection />
      <ScrollButton />
    </main>
  );
};