import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Instagram,
  Mail,
  Github,
  Linkedin,
  Phone,
} from "lucide-react";
import useSectionAnimation from "../hooks/useSectionAnimation";

export default function FooterSection() {
  const { ref, controls } = useSectionAnimation();

  return (
    <motion.footer
      ref={ref}
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
      className="w-full bg-background text-foreground transition-colors duration-300"
    >
      {/* CTA Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 pb-12 border-b border-border font-code">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Let’s Connect
          </h2>
          <Link
            to="/contact"
            className="border px-6 py-3 rounded-full flex items-center gap-2 bg-muted text-foreground hover:bg-accent hover:ring-2 hover:ring-primary/50 hover:backdrop-blur-md hover:scale-[1.03] transition-all duration-300 shadow-sm"
          >
            Hire Me Now!
          </Link>
        </div>
      </div>

      {/* Info Blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 text-sm font-code">
        <div className="text-center sm:text-left lg:flex lg:flex-col lg:items-center lg:justify-center">
          <h4 className="font-medium mb-1">Address</h4>
          <p className="text-muted-foreground">Jakarta, Indonesia</p>
        </div>
        <div className="text-center sm:text-left lg:flex lg:flex-col lg:items-center lg:justify-center">
          <h4 className="font-medium mb-1">Email Address</h4>
          <p className="text-muted-foreground break-all">sulthandrwrk@gmail.com</p>
        </div>
        <div className="text-center sm:text-left lg:flex lg:flex-col lg:items-center lg:justify-center">
          <h4 className="font-medium mb-1">Phone Number</h4>
          <p className="text-muted-foreground break-words">+62 858-1751-6675</p>
        </div>

        {/* Social Media Icons */}
        <div className="col-span-full flex justify-center gap-3 mt-2 text-foreground">
          {[
            { Icon: Instagram, href: "https://instagram.com/sulthan_dr" },
            { Icon: Github, href: "https://github.com/sulthandhafirr" },
            { Icon: Mail, href: "mailto:sulthandrwrk@gmail.com" },
            { Icon: Linkedin, href: "https://linkedin.com/in/sulthandhafirrafief" },
            { Icon: Phone, href: "https://wa.me/6285817516675" },
          ].map(({ Icon, href }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-transparent transition-all duration-300 hover:bg-muted hover:ring-2 hover:ring-primary/50 hover:backdrop-blur-sm"
            >
              <Icon className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>

      <div className="font-code max-w-7xl mx-auto px-4 sm:px-6 md:px-12 border-t border-border pt-5 pb-5 text-center text-xs text-muted-foreground">
        <p>&copy; 2025 Sulthan Dhafir Rafief | All rights reserved.</p>
      </div>
    </motion.footer>
  );
}