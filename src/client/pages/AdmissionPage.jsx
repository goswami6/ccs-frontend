import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { fetchAdmissionPage } from "../../utils/api";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { ArrowRight,  ArrowUpRight} from "lucide-react";


const Icon = ({ name, className }) => {
  const Comp = Icons[name] || Icons.CheckCircle2;
  return <Comp className={className} />;
};
// Dynamic Icon Component
const DynamicIcon = ({ name, className }) => {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return <LucideIcons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function AdmissionPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAdmissionPage();

        setData({
          hero: res.hero || {},
          steps: res.steps || [],
          documents: res.documents || [],
          features: res.features || [],
          stats: res.stats || [],
        });
      } catch (err) {
        console.error("Admission page load failed", err);
      }
    };
    load();
  }, []);
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const sessionString = `${currentYear}-${nextYear.toString().slice(-2)}`;

  if (!data) return null;

  if (!data) return <p className="p-10">Loading...</p>;
  if (!data || !data.steps) return null;

  return (
    <div className="bg-white text-slate-900">

      {/* HERO */}
      <section
        className="relative py-20 text-white bg-cover bg-center"
        style={{
          backgroundImage: `url(${data.hero.backgroundImage || "/bg.jpg"})`,
        }}
      >
        <div className="bg-black/60 absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-5xl font-black mb-6">
              {data.hero.title}
            </h1>
            <p className="text-slate-300 mb-8">
              {data.hero.subtitle}
            </p>
            <Link to="/contact" className="bg-[#C62828] hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl active:scale-95">
              {data.hero.ctaText}
            </Link>
          </div>
        </div>
      </section>



      {/* STEPS */}
      <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <span className="bg-blue-50 text-[#1E88E5] px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
              Roadmap to Success
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-8 tracking-tight">
              The Admission <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E88E5] to-[#C62828]">Journey</span>
            </h2>
            <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              A seamless, transparent {data.steps.length}-step process designed to welcome you into our academic family with ease and clarity.
            </p>
          </div>

          {/* Journey Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
            {data.steps.map((step, index) => (
              <div key={index} className="relative group">

                {/* Connector for Desktop (Hidden on last item or mobile) */}
                {index !== data.steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-0 opacity-20 group-hover:opacity-100 transition-all duration-500">
                    <ArrowRight className="text-slate-400 group-hover:text-[#1E88E5] group-hover:translate-x-2" size={24} />
                  </div>
                )}

                {/* MAIN CARD */}
                <div className="relative h-full bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-3 overflow-hidden">

                  {/* Large Background Step Number */}
                  <div className="absolute top-2 right-4 select-none pointer-events-none">
                    <span className="text-8xl font-black text-slate-50 group-hover:text-slate-100/80 transition-colors duration-500 leading-none">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Icon Container with Gradient Border Effect */}
                  <div className={`relative z-10 w-20 h-20 rounded-[1.5rem] p-[2px] mb-8 shadow-xl transition-transform duration-500 group-hover:rotate-6 bg-gradient-to-br ${step.color || 'from-blue-500 to-blue-700'}`}>
                    <div className="w-full h-full bg-white rounded-[1.4rem] flex items-center justify-center text-slate-800 group-hover:bg-transparent group-hover:text-white transition-all duration-500">
                      <DynamicIcon name={step.icon} className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-[#1E88E5] transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 text-base leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Interactive Glow Line */}
                  <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${step.color || 'from-blue-500 to-blue-700'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>

                  {/* Subtle Internal Glow on Hover */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full blur-3xl group-hover:bg-blue-50 transition-colors duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E88E5 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20 relative z-10">

          {/* LEFT SIDE: DOCUMENT CHECKLIST CARD */}
          <div className="md:w-1/2 w-full">
            <div className="p-10 md:p-14 bg-white rounded-[3.5rem] shadow-[0_20px_70px_-20px_rgba(0,0,0,0.1)] relative border border-slate-100 group">

              {/* Floating Icon Box */}
              <div className="absolute -top-8 -right-4 w-24 h-24 bg-[#C62828] rounded-[2rem] flex items-center justify-center rotate-12 shadow-2xl shadow-[#C62828]/40 group-hover:rotate-0 transition-transform duration-500">
                <LucideIcons.FileText className="text-white w-10 h-10" />
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-10 text-slate-900 tracking-tight">
                Document <br />
                <span className="text-[#1E88E5]">Checklist</span>
              </h3>

              <div className="space-y-5">
                {data.documents && data.documents.length > 0 ? (
                  data.documents.map((doc, i) => (
                    <div key={i} className="flex gap-5 items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group/item">
                      <div className="mt-1 bg-emerald-50 p-1 rounded-full group-hover/item:bg-emerald-500 transition-colors">
                        <LucideIcons.CheckCircle2 className="text-emerald-500 group-hover/item:text-white transition-colors" size={20} />
                      </div>
                      <span className="text-slate-700 font-semibold text-lg">{doc}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 italic">Please refer to the school office for document details.</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTENT & CTA */}
          <div className="md:w-1/2 w-full space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1E88E5] px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest border border-blue-100">
              <LucideIcons.Sparkles size={16} />
              Admissions Open
            </div>

            <h3 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-slate-900 tracking-tighter">
              Ready to join the <br />
              <span className="text-[#1E88E5]">Academic Session</span>
            </h3>

            <p className="text-slate-600 mb-10 leading-relaxed text-xl font-medium max-w-xl">
              Admissions are currently open for <span className="text-slate-900 font-black">Kindergarten to Grade XII</span>.
              We follow a merit-based, transparent system to ensure every child finds their perfect learning environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <Link
                to="/contact"
                className="group bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-[#1E88E5] transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-[#1E88E5]/40 active:scale-95"
              >
                Contact Now
                <LucideIcons.ArrowRightCircle className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="tel:+919569812336"
                className="flex items-center justify-center gap-3 px-10 py-5 rounded-[1.5rem] border-2 border-slate-200 font-bold text-slate-700 hover:bg-slate-100 transition-all active:scale-95"
              >
                <LucideIcons.PhoneCall size={20} className="text-[#C62828]" />
                Call Admissions
              </a>
            </div>

            {/* Dynamic Small Notice */}
            <p className="text-slate-400 text-sm font-medium mt-6">
              * Limited seats available for the upcoming term. Contact office for details.
            </p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header Area */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-[#1E88E5] font-black uppercase tracking-[0.3em] text-sm mb-4">
                The Crescent Advantage
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Why Parents <span className="text-[#C62828]">Trust Us</span> <br /> With Their Child's Future
              </h3>
            </div>
            <p className="text-slate-500 md:text-right max-w-xs text-sm leading-relaxed font-medium">
              We don't just teach; we prepare students for a world that doesn't exist yet through innovation and care.
            </p>
          </div>

          {/* Dynamic Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.features.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                {/* Icon Container - Dynamic Colors from Database */}
                <div className={`w-14 h-14 ${item.lightColor || 'bg-blue-50'} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <div className={`${item.color || 'bg-blue-600'} text-white p-3 rounded-xl shadow-lg shadow-current/20`}>
                    <DynamicIcon name={item.icon} className="w-6 h-6" />
                  </div>
                </div>

                {/* Text Content */}
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 tracking-tight">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                  {item.description}
                </p>

                {/* Decorative Corner Arrow */}
                <div className="absolute top-8 right-8 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#1E88E5] transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight size={24} />
                </div>

                {/* Hover Bottom Bar - Dynamic Color */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 ${item.color || 'bg-blue-600'} group-hover:w-1/2 transition-all duration-500 rounded-t-full`}></div>
              </div>
            ))}
          </div>

          {/* Dynamic Bottom Stat Bar */}
          <div className="mt-24 p-2 bg-slate-900 rounded-[3.5rem] flex flex-wrap justify-around items-center py-10 px-6 shadow-2xl shadow-slate-900/30">
            {data.stats.map((stat, i) => (
              <div
                key={i}
                className="text-center px-8 border-r border-white/10 last:border-0 min-w-[200px] py-4"
              >
                <p className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-black italic">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
