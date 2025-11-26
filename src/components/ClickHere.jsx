import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Download, MessageCircle, X, Sparkles } from "lucide-react";

export const ClickHere = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const inactivityTimer = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setIsExpanded(true);
      handleButtonInteraction();
    }
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
      startInactivityTimer();
    }, 800);

    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []);

  const startInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    setIsTransparent(false);
    inactivityTimer.current = setTimeout(() => {
      setIsTransparent(true);
    }, 1000);
  };

  const handleButtonInteraction = () => {
    startInactivityTimer();
  };

  const handleDownloadCV = () => {
    const cvUrl = "/about/CV.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Sulthan_Dhafir_Rafief_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactMe = () => {
    setIsExpanded(false);
    setTimeout(() => {
      navigate("/contact");
    }, 300);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && !isExpanded && (
          <>
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.1}
              dragConstraints={{
                top: 0,
                left: 0,
                right: window.innerWidth - 200,
                bottom: window.innerHeight - 200,
              }}
              initial={{ 
                opacity: 0, 
                scale: 0, 
                x: window.innerWidth - 270,
                y: 105
              }}
              animate={{ 
                opacity: isTransparent ? 0.3 : 1, 
                scale: 1 
              }}
              transition={{ opacity: { duration: 0.5 } }}
              className="hidden md:block fixed z-[100] cursor-move"
              style={{ touchAction: 'none' }}
              onDragStart={(e, info) => {
                setIsDragging(false);
                dragStartPos.current = { x: info.point.x, y: info.point.y };
                handleButtonInteraction();
              }}
              onDrag={() => {
                setIsDragging(true);
              }}
              onDragEnd={(e, info) => {
                const dragDistance = Math.sqrt(
                  Math.pow(info.point.x - dragStartPos.current.x, 2) +
                  Math.pow(info.point.y - dragStartPos.current.y, 2)
                );
                if (dragDistance > 5) {
                  setTimeout(() => setIsDragging(false), 100);
                } else {
                  setIsDragging(false);
                }
              }}
              onMouseEnter={handleButtonInteraction}
            >
              <motion.button
                onClick={() => {
                  if (!isDragging) {
                    setIsExpanded(true);
                    handleButtonInteraction();
                  }
                }}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-full shadow-2xl hover:shadow-primary/50 transition-all flex items-center gap-2 font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4" />
                Click Here!
              </motion.button>
            </motion.div>


          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card rounded-3xl shadow-2xl w-full max-w-md p-8 relative border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">
                  👋
                </div>

                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Hire Me!
                </h2>

                <p className="text-muted-foreground mb-8 text-sm leading-relaxed"> 
                  Good Morning, Good Afternoon, Good Evening. I'm Rafief. Let's work together to create something amazing!
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDownloadCV}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download My CV
                  </button>

                  <button
                    onClick={handleContactMe}
                    className="w-full bg-muted text-foreground hover:bg-muted/80 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Me
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
