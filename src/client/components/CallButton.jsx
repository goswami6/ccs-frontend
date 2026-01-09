import React, { useState, useEffect } from "react";
import { PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CallButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = "7309045674";

  // --- Scroll Logic---
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          className="fixed bottom-8 right-9 z-[100] group"
        >
          {/* --- Tooltip (Left Aligned) --- */}
          <div className="absolute bottom-full left-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0">
            <div className="bg-dark text-black text-xs font-bold px-4 py-2 rounded-xl shadow-xl whitespace-nowrap relative">
              Call us now!
              <div className="absolute top-full left-6 border-8 border-transparent border-t-dark"></div>
            </div>
          </div>

          {/* --- Main Call Button --- */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCall}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-shadow duration-300 group-hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)]"
          >
            {/* Inner Glow (Hover Only) */}
            <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
            
            <PhoneCall size={26} className="z-10 fill-current" />
          </motion.button>

          {/* --- Static Red Dot (Status Indicator) --- */}
          <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full z-20 shadow-sm">
            
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallButton;