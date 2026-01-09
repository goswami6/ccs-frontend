import { useEffect, useState } from "react";
import { fetchAboutPage } from '../../utils/api';
import { Loader2, AlertCircle } from 'lucide-react';

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAboutContent = async () => {
      try {
        // Corrected: Yahan 'res' hi direct data hai kyunki utils mein res.data return ho raha hai
        const result = await fetchAboutPage();

        if (result) {
          setData(result);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getAboutContent();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <span className="ml-3 font-bold text-slate-500 uppercase tracking-widest">Loading...</span>
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
      <AlertCircle className="text-red-500 mb-4" size={50} />
      <h2 className="text-2xl font-black text-slate-800">Oops! Data Not Found</h2>
      <p className="text-slate-500 mt-2">Check if your backend server is running on port 5006.</p>
      <button onClick={() => window.location.reload()} className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg">
        Try Refreshing
      </button>
    </div>
  );

  // Fallback values to prevent crashes if some fields are missing
  const {
    hero = {},
    history = {},
    vision = {},
    mission = [],
    principal = {},
    coreValues = []
  } = data;

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center">

        {/* 1. BACKGROUND IMAGE */}
        {/* Replace 'images/about-hero.jpg' with your school building image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${hero?.backgroundImage})` }}
        >
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* 2. TEXT CONTENT */}
        <div className="relative z-10 text-center px-4">
          {/* Breadcrumb - Small helper text */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-white/60 text-xs uppercase tracking-[0.3em]">Home</span>
            <span className="text-white/60 text-xs">/</span>
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">About Us</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            {hero?.title}
          </h1>

          {/* Decorative Line */}
          <div className="w-24 h-1.5 bg-danger mx-auto mt-6 rounded-full"></div>
        </div>

        {/* 3. DESIGN ELEMENT (Optional Slant at bottom) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 120L0 0L1200 120Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      {/* ================= HISTORY ================= */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* LEFT COLUMN: Image with Decorative Elements */}
            <div className="w-full lg:w-1/2 relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:rotate-1">
                <img
                  src={history?.image}
                  alt="School Building 2023"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                {/* Floating Badge */}
                <div className="absolute top-6 left-6 bg-[#C62828] text-white px-6 py-3 rounded-lg shadow-xl font-bold italic animate-bounce">
                  ESTD. 2023
                </div>
              </div>

              {/* Background Decorative Frame (Primary Blue) */}
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-[12px] border-[#1E88E5]/10 rounded-2xl -z-0"></div>

              {/* Dots Pattern Accent */}
              <div className="absolute -top-10 -left-10 w-32 h-32 opacity-20 hidden md:block" style={{ backgroundImage: 'radial-gradient(#1E88E5 2px, transparent 2px)', backgroundSize: '15px 15px' }}></div>
            </div>

            {/* RIGHT COLUMN: Content */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C62828]"></span>
                  <span className="text-[#C62828] font-bold uppercase tracking-widest text-sm">
                    The Legacy of Excellence
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold text-[#212121] leading-tight">
                  Our Journey Towards <br />
                  <span className="text-[#1E88E5]">Quality Education</span>
                </h2>

                <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
                  {history?.description?.map((p, i) => (
                    <p key={i} className="text-gray-600 mb-4 text-lg">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Stats / Fast Facts for Modern Look */}
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="border-l-4 border-[#1E88E5] pl-4">
                    <span className="block text-3xl font-black text-[#212121]">2+</span>
                    <span className="text-xs uppercase font-bold tracking-tighter text-gray-400">Years of Growth</span>
                  </div>
                  <div className="border-l-4 border-[#2E7D32] pl-4">
                    <span className="block text-3xl font-black text-[#212121]">500+</span>
                    <span className="text-xs uppercase font-bold tracking-tighter text-gray-400">Happy Students</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ================= VISION & MISSION ================= */}
      <section className="py-20 bg-bg-light"> {/* Using bg-bg-light for a subtle off-white background */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-[#1E88E5] font-bold tracking-widest uppercase text-sm mb-3">Our Core Values</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-[#212121]">
              Guiding Principles for Our Future
            </p>
            <div className="w-24 h-1.5 bg-[#C62828] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Vision and Mission Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* VISION CARD */}
            <div className="bg-[#1E88E5] text-white p-10 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center transition-transform duration-500 hover:scale-[1.02]">
              <svg className="w-16 h-16 mb-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-3xl font-extrabold mb-4 leading-tight">Our Vision</h3>
              <p className="text-xl italic">{vision?.text}</p>
            </div>

            {/* MISSION CARD */}
            <div className="relative group overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-[#2E7D32] via-[#388E3C] to-[#1B5E20] shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(46,125,50,0.3)]">

              {/* Decorative Animated Circle in Background */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>

              <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-[calc(1.5rem-1px)] p-8 md:p-10 border border-white/20">

                {/* Header Section */}
                <div className="flex items-center gap-5 mb-10">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/30 shadow-inner">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.2dbM11 5.882l-7 5.176m7-5.176l7 5.176M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 18l-3 3m0 0l-3-3m3 3V10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tight uppercase">Our Mission</h3>
                    <div className="h-1 w-12 bg-white/40 rounded-full mt-1"></div>
                  </div>
                </div>

                {/* Mission List with Glass Effect */}
                <div className="grid grid-cols-1 gap-4">
                  {mission?.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white/10 p-4 rounded-xl"
                    >
                      <span className="text-2xl bg-white text-black w-10 h-10 flex items-center justify-center rounded-lg">
                        {m.icon}
                      </span>
                      <span className="text-lg">{m.text}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Accent */}
                <div className="mt-8 flex justify-end">
                  <span className="text-white/30 text-xs font-bold uppercase tracking-[0.5em]">Crescent City</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRINCIPAL ================= */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="relative bg-[#f8fafc] rounded-[2rem] overflow-hidden shadow-xl border border-gray-100">

            {/* Decorative Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E88E5]/5 rounded-full -mr-32 -mt-32"></div>

            <div className="flex flex-col lg:flex-row">

              {/* LEFT SIDE: Image Section */}
              <div className="w-full lg:w-2/5 relative h-[400px] lg:h-auto">
                <img
                  src={principal?.photo} // Replace with actual principal photo
                  alt="Principal of Crescent City School"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient overlay on image for mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/80 via-transparent to-transparent lg:hidden"></div>

                {/* Name Badge on Image */}
                <div className="absolute bottom-6 left-6 text-white lg:text-[#212121] lg:bg-white/90 lg:backdrop-blur-md lg:p-4 lg:rounded-xl lg:shadow-lg">
                  <p className="font-black text-xl lg:text-2xl uppercase tracking-tighter leading-none">
                    Dr. Sarah <span className="text-[#1E88E5]">Johnson</span>
                  </p>
                  <p className="text-sm font-bold opacity-80 uppercase tracking-widest mt-1">
                    Principal, CCS
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE: Message Section */}
              <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 relative">

                {/* Large Quote Icon Backdrop */}
                <div className="absolute top-10 right-10 opacity-[0.05] text-[#1E88E5]">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21L14.017 18C14.017 16.899 14.917 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H15.017C14.465 8 14.017 8.448 14.017 9V12C14.017 12.552 13.569 13 13.017 13H12.017V21H14.017ZM6.017 21L6.017 18C6.017 16.899 6.917 16 8.017 16H11.017C11.569 16 12.017 15.552 12.017 15V9C12.017 8.448 11.569 8 11.017 8H7.017C6.465 8 6.017 8.448 6.017 9V12C6.017 12.552 5.569 13 5.017 13H4.017V21H6.017Z" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h4 className="text-[#C62828] font-bold uppercase tracking-[0.3em] text-xs mb-4">
                    Leadership Message
                  </h4>

                  {/* The Big Quote */}
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#212121] leading-tight mb-8 italic italic-primary">
                    “{principal?.message?.[0]}”
                  </h2>

                  <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                    {principal?.message?.slice(1).map((p, i) => (
                      <p key={i} className="text-gray-600 mb-4 text-lg">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Principal Signature Area */}
                  <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="font-serif text-3xl text-[#212121]/40 select-none"> {principal?.name}</p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{principal?.designation}</p>
                    </div>
                    <button className="hidden sm:block bg-[#1E88E5] hover:bg-[#1565C0] text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-md">
                      Full Profile
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ================= CORE VALUES ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Header with Decorative Element */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-4 py-1.5 mb-4 text-xs font-black tracking-[0.3em] text-blue-600 bg-blue-50 rounded-full uppercase">
              Our Philosophy
            </div>
            <h2 className="text-[#212121] text-4xl md:text-5xl font-black mb-6 tracking-tight">
              The Foundation of <span className="text-blue-600">CCS</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We don't just teach subjects; we nurture the character traits that
              define a successful and compassionate human being.
            </p>
            <div className="w-20 h-1.5 bg-red-600 mx-auto mt-8 rounded-full"></div>
          </div>

          {/* 3-Column Grid with Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues?.map((v, i) => (
              <div
                key={i}
                className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Decorative Number */}
                <span className="absolute -top-4 -right-2 text-9xl font-black text-slate-50 group-hover:text-blue-50 transition-colors duration-500 pointer-events-none">
                  0{i + 1}
                </span>

                <div className="relative z-10">
                  {/* Dynamic Icon Placeholder (Aap v.icon use kar sakte hain agar backend mein hai) */}
                  <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-2xl mb-8 shadow-lg shadow-blue-200 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <span className="text-2xl font-bold">{v.title.charAt(0)}</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {v.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed font-medium">
                    {v.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className="mt-6 w-0 group-hover:w-12 h-1 bg-red-600 transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

/* ================= HELPERS ================= */

const Stat = ({ label, value }) => (
  <div className="border-l-4 border-primary pl-4">
    <span className="block text-3xl font-black">{value}</span>
    <span className="text-xs uppercase font-bold text-gray-400">
      {label}
    </span>
  </div>
);








