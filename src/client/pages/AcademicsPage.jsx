import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { fetchAcademicsPage } from "../../utils/api";

/* 🔥 ICON RESOLVER */
const Icon = ({ name, className, size = 20 }) => {
  const Comp = Icons[name] || Icons.BookOpen;
  return <Comp size={size} className={className} />;
};

export default function AcademicsPage() {
  const [data, setData] = useState(null);
  const [activeLevel, setActiveLevel] = useState("Primary");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchAcademicsPage();

        // 🔐 SAFE STATE SET
        setData({
          hero: res?.hero || {
            title: "",
            subtitle: "",
            backgroundImage: "",
          },
          pillars: res?.pillars || [],
          levels: res?.levels || {},
          methods: res?.methods || [],
        });

        // ✅ AUTO SELECT FIRST LEVEL
        const firstLevel = Object.keys(res?.levels || {})[0];
        if (firstLevel) setActiveLevel(firstLevel);

      } catch (error) {
        console.error("Failed to load academics page:", error);
      }
    };

    loadData();
  }, []);

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* 1. BACKGROUND IMAGE WITH GRADIENT MASK */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg.jpg"
            alt="Modern Classroom"
            className="w-full h-full object-cover opacity-50 scale-105 animate-slow-pan"
          />
          {/* Modern radial gradient to focus attention on text */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950/20"></div>
        </div>
        {/* 2. FLOATING DECORATIVE ELEMENTS */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#1E88E5] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#C62828] rounded-full blur-[120px] opacity-20"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Icons.Sparkle size={16} className="text-[#1E88E5]" />
            <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">
              Excellence in Education
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-[#1E88E5] mb-6 tracking-tighter">
            {data.hero.title}

          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            {data.hero.subtitle}
          </p>
        </div>
        {/* 4. SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      <div className="bg-white min-h-screen font-sans">

        {/* ================= PILLARS ================= */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Our <span className="text-[#1E88E5]">Curriculum</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              We follow a comprehensive framework designed to nurture curiosity and foster a lifelong love for learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.pillars.map((p, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 transition-all duration-500 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon name={p.icon} className={p.color} size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {p.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
        {/* ================= LEVELS ================= */}
        <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-10 overflow-hidden shadow-2xl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-start">

              {/* LEFT SIDE: LEVEL SELECTOR */}
              <div className="lg:w-1/2 w-full">
                <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">
                  Educational <br />
                  <span className="text-[#1E88E5]">Levels Offered</span>
                </h2>

                <div className="space-y-3">
                  {Object.keys(data.levels).map((level) => (
                    <button
                      key={level}
                      onClick={() => setActiveLevel(level)}
                      className={`w-full text-left px-8 py-6 rounded-3xl font-bold transition-all duration-300 flex justify-between items-center group ${activeLevel === level
                        ? 'bg-[#1E88E5] text-white shadow-[0_10px_30px_-10px_rgba(30,136,229,0.5)] translate-x-4'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:translate-x-2'
                        }`}
                    >
                      <span className="capitalize">{level.replace(/([A-Z])/g, ' $1')}</span>
                      <div className={`w-2.5 h-2.5 rounded-full transition-all ${activeLevel === level ? 'bg-white animate-pulse' : 'bg-white/20 group-hover:bg-white/40'
                        }`}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: CURRICULUM DETAILS */}
              <div className="lg:w-1/2 w-full bg-white/5 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-inner relative overflow-hidden">
                {/* Background Glow Decor */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#1E88E5]/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-8 text-[#1E88E5] capitalize flex items-center gap-3">
                    {activeLevel.replace(/([A-Z])/g, ' $1')}
                    <span className="text-white text-lg font-light">| Curriculum</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.levels[activeLevel]?.length > 0 ? (
                      data.levels[activeLevel].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors group"
                        >
                          <div className="bg-white/10 p-2 rounded-lg group-hover:bg-[#C62828]/20 transition-colors">
                            <Icons.CheckCircle2 size={18} className="text-[#C62828]" />
                          </div>
                          <span className="font-semibold text-slate-200">{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 italic">No curriculum details added for this level.</p>
                    )}
                  </div>

                  {/* Dynamic Footer Note */}
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <p className="text-slate-400 text-sm italic border-l-4 border-[#C62828] pl-6 py-1">
                      Our {activeLevel} program is designed for comprehensive development through {data.methods?.length || 0} unique teaching methodologies.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* ================= METHODS ================= */}
        {/* SECTION 3: TEACHING METHODOLOGY */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="bg-blue-50 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <span className="text-[#1E88E5] font-black uppercase tracking-widest text-xs mb-4 block">How We Teach</span>
                <h2 className="text-4xl font-black text-slate-900 mb-6">Innovative Teaching <br /><span className="text-[#C62828]">Methodologies</span></h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  We believe every child learns differently. Our methodology combines high-tech smart classes with hands-on project-based experiences.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.methods.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 font-bold text-slate-800">
                      <div className="w-8 h-8 bg-[#1E88E5] text-white flex items-center justify-center rounded-lg">
                        <Icon name={m.icon} size={16} />
                      </div>
                      {m.title}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                {/* Replace with a real classroom image */}
                <div className="aspect-video bg-white rounded-3xl shadow-2xl border-8 border-white overflow-hidden rotate-2 group hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold">
                    [Smart Classroom Visual]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  );
}





