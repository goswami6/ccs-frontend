import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchHeroSlides } from "../../utils/api";

const BrandHero = () => {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const data = await fetchHeroSlides("brand_logo");

        // 🔥 only first logo (single logo system)
        if (Array.isArray(data) && data.length > 0) {
          setLogo(data[0]);
        }
      } catch (err) {
        console.error("Failed to load brand logo", err);
      }
    };

    loadLogo();
  }, []);

  if (!logo) return null; // optional loader can be added

  const logoSrc = logo.image.startsWith("http")
    ? logo.image
    : `${import.meta.env.VITE_API_URL.replace("/api", "")}${logo.image}`;

  return (
    <div className="bg-white py-16 md:py-24 border-b border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">

        {/* IMAGE REVEAL CONTAINER */}
        <div className="relative overflow-hidden">

          {/* MASK ANIMATION */}
          <motion.div
            initial={{ height: "100%" }}
            whileInView={{ height: "0%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }}
            className="absolute inset-0 bg-white z-10"
          />

          {/* LOGO */}
          <motion.img
            src={logoSrc}
            alt="Crescent City School Logo"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-36 md:h-64 w-auto object-contain"
          />
        </div>

        {/* DECORATIVE LINE */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-32 h-1 bg-[#1E88E5] mt-8 rounded-full origin-center"
        />

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-6"
        >
          <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase">
            Established Excellence
          </span>
        </motion.div>

      </div>
    </div>
  );
};

export default BrandHero;
