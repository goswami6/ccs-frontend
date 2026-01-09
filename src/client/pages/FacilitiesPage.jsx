import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { ChevronRight, ShieldCheck, Microscope, Trophy } from 'lucide-react';
import { fetchFacilitiesPage } from '../../utils/api';

// Helper for dynamic icons from backend strings
const DynamicIcon = ({ name, className }) => {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return <LucideIcons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

const FacilitiesPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchFacilitiesPage().then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center font-black text-2xl animate-pulse text-slate-300">Loading Campus...</div>;

  return (
    <>
      <div className="bg-white min-h-screen">

        {/* SECTION 1: HERO & ACADEMIC HUB */}
        <section className="py-24 bg-white font-sans">
          <div className="max-w-7xl mx-auto px-6">

            {/* Header Section (Dynamic Hero) */}
            <div className="max-w-3xl mb-16">
              <span className="text-[#1E88E5] font-black uppercase tracking-[0.2em] text-xs px-4 py-1.5 bg-blue-50 rounded-full inline-block mb-4 border border-blue-100">
                Our Infrastructure
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">
                {data.hero?.title || "Modern Campus Facilities"}
              </h2>
              <p className="text-slate-500 mt-4 text-lg font-medium">
                {data.hero?.subtitle}
              </p>
              <div className="w-20 h-1.5 bg-[#C62828] mt-6 rounded-full"></div>
            </div>

            {/* Facility Grid (Dynamic Academic Facilities) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.academicFacilities?.map((f, i) => (
                <div
                  key={i}
                  className={`group relative p-10 rounded-[3rem] bg-slate-50 border-2 border-transparent transition-all duration-500 hover:border-slate-200 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]`}
                >
                  {/* Icon Container with Dynamic Background from Admin */}
                  <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <DynamicIcon name={f.icon} className={`w-8 h-8 ${f.color?.replace('bg-', 'text-') || 'text-blue-600'}`} />
                  </div>

                  <h3 className="text-2xl font-black text-slate-800 mb-4 flex items-center justify-between">
                    {f.title}
                    <ChevronRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-300" />
                  </h3>

                  <p className="text-slate-500 leading-relaxed font-medium text-sm">
                    {f.description}
                  </p>

                  {/* Decorative Number */}
                  <span className="absolute bottom-8 right-10 text-6xl font-black text-slate-100/50 pointer-events-none group-hover:text-slate-200 transition-colors">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: SCIENCE & SPORTS (Dynamic Split) */}
        <section className="bg-slate-900 py-24 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#1E88E5]/20 rounded-full blur-3xl"></div>
              <h2 className="text-4xl font-black mb-12 leading-tight">Beyond the <br /><span className="text-[#1E88E5]">Textbooks</span></h2>

              <div className="space-y-12">
                {/* Science Lab Data */}
                <div className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    <Microscope size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">{data.scienceSports?.scienceTitle}</h4>
                    <p className="text-slate-400 leading-relaxed">{data.scienceSports?.scienceDesc}</p>
                  </div>
                </div>
                
                {/* Sports Data */}
                <div className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#C62828] flex items-center justify-center text-white shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform">
                    <Trophy size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">{data.scienceSports?.sportsTitle}</h4>
                    <p className="text-slate-400 leading-relaxed">{data.scienceSports?.sportsDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Image from Admin */}
            <div className="relative rounded-[3.5rem] overflow-hidden group shadow-2xl border-8 border-slate-800">
              <img 
                src={data.scienceSports?.image || "/bg.jpg"} 
                alt="Sports and Labs" 
                className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TRANSPORT & SECURITY (Dynamic Checklist) */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 rounded-[4rem] p-12 md:p-20 border border-slate-100 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">Logistics & <span className="text-[#1E88E5]">Safety</span></h3>
              <p className="text-slate-500 mb-10 text-lg">Your child’s safety is our highest priority, both on campus and during the commute.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.logistics?.map((item, i) => (
                  <div key={i} className="bg-white p-5 rounded-3xl flex items-center gap-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="p-2 bg-slate-50 rounded-xl">
                       <DynamicIcon name={item.icon} className="text-[#1E88E5] w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
               {/* Animated Safety Badge */}
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-[#1E88E5] rounded-[3.5rem] flex items-center justify-center p-12 text-center shadow-2xl shadow-blue-200">
                <div className="space-y-6">
                  <div className="bg-white/20 p-8 rounded-full inline-block backdrop-blur-md animate-bounce">
                    <ShieldCheck size={64} className="text-white" />
                  </div>
                  <h4 className="text-3xl font-black text-white">Zero Compromise <br/>on Safety</h4>
                  <p className="text-blue-100 font-medium">All staff members are background verified and trained in first-aid emergency protocols.</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-500 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default FacilitiesPage;