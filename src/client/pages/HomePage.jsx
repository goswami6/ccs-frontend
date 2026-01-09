import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrandHero from '../components/BrandHero';
import { motion } from 'framer-motion';
import { fetchHeroSlides, fetchFeatures, fetchNews } from "../../utils/api";

import {
  GraduationCap,
  Users,
  ShieldCheck,
  Monitor,
  Bus,
  Trophy,
} from "lucide-react";
import { Mail, Phone, MapPin } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm';

const iconMap = {
  "academic-cap": GraduationCap,
  users: Users,
  "shield-check": ShieldCheck,
  monitor: Monitor,
  bus: Bus,
  trophy: Trophy,
};

const HomePage = () => {
  const [slides, setSlides] = useState([]);
  const [features, setFeatures] = useState([]);
  const [tickerContent, setTickerContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Load All Data on Mount
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        const [heroData, featureData, newsData] = await Promise.all([
          fetchHeroSlides("hero"),
          fetchFeatures(),
          fetchNews()
        ]);

        // Set Slides
        setSlides(Array.isArray(heroData) ? heroData : heroData?.data || []);

        // Set Features
        setFeatures(Array.isArray(featureData) ? featureData : []);

        // Set News Ticker
        setTickerContent(Array.isArray(newsData) ? newsData.slice(0, 10) : []);

      } catch (err) {
        console.error("Data loading failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  // 2. Hero Slider Timer
  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  // Infinite Scroll logic for ticker
  const doubledContent = [...tickerContent, ...tickerContent];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const links = [
    {
      title: "Admissions",
      description: "Join our community for the 2025-26 session.",
      image: "/link1.jpg",
      link: "/admission",
      color: "bg-danger"
    },
    {
      title: "Academics",
      description: "Explore our CBSE curriculum and smart labs.",
      image: "link2.jpg",
      link: "/academics/details",
      color: "bg-primary"
    },
    {
      title: "Gallery",
      description: "A glimpse into our campus life and events.",
      image: "/link3.jpg",
      link: "/gallery",
      color: "bg-success"
    },
    {
      title: "Contact Us",
      description: "Get in touch with our administration office.",
      image: "/bg.jpg",
      link: "/contact",
      color: "bg-primary-dark"
    }
  ];

  if (loading) return null; // Or a loading spinner

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden bg-black">
        {slides.map((slide, index) => (
          <div
            key={slide._id || index}
            className={`transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 block" : "opacity-0 hidden"
              }`}
          >
            <img
              src={
                slide.image.startsWith("http")
                  ? slide.image
                  : `${import.meta.env.VITE_API_URL.replace("/api", "")}${slide.image}`
              }
              alt="hero banner"
              className="w-full h-auto object-contain md:object-cover bg-black"
            />
          </div>
        ))}

        {/* DOTS */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 h-2 sm:w-8 sm:h-3 bg-primary" : "w-2 h-2 sm:w-3 sm:h-3 bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Dynamic NewsTicker */}
      {tickerContent.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white border-y border-gray-100 shadow-sm overflow-hidden font-sans"
        >
          <div className="max-w-7xl mx-auto flex items-center">
            {/* 1. STICKY LABEL */}
            <div className="relative z-20 bg-[#C62828] px-4 md:px-8 py-4 flex items-center gap-3 shadow-xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] whitespace-nowrap">
                Latest Updates
              </span>
              <div className="absolute top-0 -right-4 h-full w-10 bg-[#C62828] skew-x-[15deg] -z-10"></div>
            </div>

            {/* 2. SCROLLING CONTENT */}
            <div className="flex-1 overflow-hidden py-3 bg-slate-50/50 relative">
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

              <motion.div
                className="flex whitespace-nowrap items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
                whileHover={{ transition: { duration: 0 }, opacity: 1 }}
              >
                {doubledContent.map((item, index) => (
                  <Link
                    to={`/news`}
                    key={index}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex items-center gap-2 mx-10">
                      {item.urgent && (
                        <span className="bg-orange-500 text-white text-[8px] px-1.5 py-0.5 rounded font-black uppercase">Urgent</span>
                      )}
                      <span className="text-sm md:text-base font-bold text-slate-700 group-hover:text-[#1E88E5] transition-colors cursor-pointer">
                        {item.title}
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      <BrandHero />

      {/* About Section */}
      <div className="relative bg-white overflow-hidden lg:py-15 py-0 font-sans">
        <div className="absolute right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 transform translate-x-20 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 py-16 lg:py-24">
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-5/12 relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <img src="/about.jpg" alt="About CCS" className="w-full h-[400px] md:h-[550px] object-cover" />
              </div>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="absolute -top-6 -left-6 w-full h-full bg-blue-600/10 rounded-2xl -z-0" />
            </motion.div>

            {/* RIGHT COLUMN */}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="w-full lg:w-7/12">
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
                <div className="w-12 h-1 bg-red-600"></div>
                <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs">Welcome to our institution</span>
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Inspiring Excellence, <br /> <span className="text-blue-600">Nurturing Tomorrow's Leaders</span>
              </motion.h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <motion.p variants={itemVariants}>At <span className="text-slate-900 font-bold">Crescent City School</span>, we are committed to academic rigor and character development.</motion.p>
                <motion.blockquote variants={itemVariants} className="border-l-4 border-blue-600 pl-6 py-4 italic text-slate-800 bg-slate-50 rounded-r-2xl">
                  "Our mission is to prepare students for tomorrow’s challenges through character development and academic rigor."
                </motion.blockquote>
              </div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-10">
                <Link to="/about" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-sm">Read More About Us</Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Why Choose Us</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-text-dark">Key Highlights of Our School</p>
            <div className="w-20 h-1.5 bg-success mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <div key={feature._id} className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-success/10 bg-success/5">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-success mb-6 shadow-sm group-hover:bg-success group-hover:text-white transition-colors duration-300">
                    {Icon && <Icon className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-success transition-colors">{feature.title}</h3>
                  <p className="text-text-grey leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* enquiry form */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left Side: Text & Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                  Contact Us
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  Have Questions? <br />
                  <span className="text-blue-600">Get in Touch</span> with Us.
                </h2>
                <p className="text-slate-500 mt-6 text-lg font-medium leading-relaxed">
                  Whether you're inquiring about admissions, scheduling a tour, or just want to say hello, we're here to help.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Call Us</p>
                    <p className="font-bold text-slate-800">+91 9569812336</p>
                    <p className="font-bold text-slate-800">+91 7309045674</p>
                    <p className="font-bold text-slate-800">+91 8795284282</p>
                  </div>
                </div>

                {/* <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Working Hours</p>
                    <p className="font-bold text-slate-800">Mon – Sat: 8:00 AM – 4:00 PM</p>
                  </div>
                </div> */}

                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Visit Us</p>
                    <p className="font-bold text-slate-800">Badagaon Budhanpur, Azamgarh, Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: The Form */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>

          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Quick Actions</h2>
              <p className="text-3xl md:text-4xl font-extrabold text-text-dark">Explore Crescent City</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {links.map((item, index) => (
              <Link to={item.link} key={index} className="group relative h-80 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className={`w-10 h-1 mb-3 rounded-full ${item.color}`}></div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.description}</p>
                  <span className="inline-flex items-center text-white text-xs font-bold uppercase tracking-wider group-hover:underline">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


    </>
  );
};

export default HomePage;