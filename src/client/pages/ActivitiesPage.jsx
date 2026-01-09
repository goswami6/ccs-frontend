import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Calendar } from "lucide-react";
import { fetchActivitiesPage } from "../../utils/api";
import { Link } from 'react-router-dom';

const Icon = ({ name, className }) => {
  const Comp = Icons[name] || Icons.Sparkles;
  return <Comp className={className} />;
};

const ActivitiesPage = () => {
  const [data, setData] = useState(null);


  useEffect(() => {
    fetchActivitiesPage().then((res) => {
      setData({
        hero: {
          title: "",
          subtitle: "",
          backgroundImage: "",
          ...(res?.hero || {}),
        },
        coCurriculars: res?.coCurriculars || [],
        clubs: res?.clubs || [],
        events: res?.events || [],
        fieldTrip: {
          title: "",
          description: "",
          buttonText: "",
          ...(res?.fieldTrip || {}),
        },
      });
    });
  }, []);
  // Helper Component: String ko actual Icon mein badalne ke liye
  const DynamicIcon = ({ name, className }) => {
    const IconComponent = LucideIcons[name]; // Object se icon nikalna (e.g., LucideIcons["Music"])

    if (!IconComponent) {
      return <LucideIcons.HelpCircle className={className} />; // Agar icon na mile toh fallback
    }

    return <IconComponent className={className} />;
  };


  if (!data) return <p className="p-10">Loading...</p>;


  return (

    <div className="bg-slate-50 text-slate-900 font-sans">

      {/* 1. MODERN HERO HEADER */}
      <div>
        {/* ================= HERO SECTION ================= */}
        <div className="relative h-[60vh] flex items-center justify-center bg-[#1a1a1a] overflow-hidden">

          {/* FIX 1: Render img only if backgroundImage exists and is not an empty string */}
          {data.hero?.backgroundImage ? (
            <div className="absolute inset-0 opacity-40">
              <img
                src={data.hero.backgroundImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-slate-800 opacity-40"></div> // Fallback background
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]/80"></div>

          <div className="relative z-10 text-center px-6">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1 rounded-full text-xs uppercase tracking-[0.3em] mb-4 inline-block">
              Crescent City Life
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-[#1E88E5] mb-6">
              {data.hero?.title || "Activities"}
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
              {data.hero?.subtitle || ""}
            </p>
          </div>
        </div>


      </div>

      {/* 2. CO-CURRICULAR: SOFT CARD GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-[#C62828] font-bold text-sm uppercase tracking-widest mb-2">Talent Development</h2>
            <h3 className="text-4xl font-black text-slate-800">Co-Curricular <span className="text-[#1E88E5]">Excellence</span></h3>
          </div>
          <p className="text-slate-500 text-sm md:text-right max-w-xs italic">"Where every hobby finds a professional direction."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.coCurriculars?.map((a, i) => (
            <div
              key={i}
              className="group relative bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 overflow-hidden"
            >
              {/* Trending Badge (Agar aapne admin mein select kiya hai) */}
              {a.trending && (
                <div className="absolute top-5 right-5 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  Trending
                </div>
              )}

              {/* Icon Container */}
              <div
                className="mb-6 p-4 rounded-2xl bg-slate-50 inline-block transition-all duration-500 group-hover:bg-slate-900 group-hover:!text-white"
                style={{
                  // Agar DB mein "text-pink-500" save hai, toh hum sirf "pink" nikal rahe hain
                  color: a.color.replace('text-', '').replace('-500', '')
                }}
              >
                <DynamicIcon
                  name={a.icon}
                  className="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h4 className="text-2xl font-bold mb-3 group-hover:text-[#1E88E5] transition-colors uppercase tracking-tight">
                {a.name}
              </h4>

              <p className="text-slate-500 leading-relaxed font-medium">
                {a.description}
              </p>

              {/* Decorative line on hover */}
              <div className="absolute bottom-0 left-0 h-1 bg-[#1E88E5] w-0 group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CLUBS: BOLD GRADIENT CARDS */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black mb-4">The Club <span className="text-[#2E7D32]">Culture</span></h3>
            <p className="text-slate-400">Join a community that shares your vision.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.clubs?.map((c, i) => (
              <div
                key={i}
                className="relative p-8 rounded-[2.5rem] group hover:scale-[1.03] transition-all duration-500 cursor-pointer shadow-xl overflow-hidden border border-white/10"
                style={{
                  // Agar Tailwind classes kaam na karein, toh inline gradient as fallback
                  background: `linear-gradient(135deg, ${c.gradient?.includes('from-') ? 'transparent' : '#1e293b'}, transparent)`,
                }}
              >
                {/* Background Tailwind Gradient Layer */}
                <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient || 'from-slate-800 to-slate-900'} opacity-100`} />

                {/* Decorative Pattern / Glassmorphism Effect */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />

                <div className="relative z-10 text-white">
                  {/* Icon Wrapper */}
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-[10deg] group-hover:scale-110 transition-all duration-500">
                    <DynamicIcon
                      name={c.icon}
                      className="w-7 h-7 text-white drop-shadow-md"
                    />
                  </div>

                  {/* Text Content */}
                  <h4 className="text-2xl font-black mb-2 tracking-tight leading-tight">
                    {c.name}
                  </h4>

                  <div className="h-1 w-12 bg-white/40 rounded-full mb-3 group-hover:w-20 transition-all duration-500" />

                  <p className="text-white/80 text-sm font-medium italic leading-relaxed">
                    "{c.motto}"
                  </p>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ANNUAL EVENTS: BORDERLESS MINIMALISM */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-slate-200"></div>
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
            <Calendar className="text-[#1E88E5]" /> Signature Events
          </h3>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {data?.events?.map((e, i) => (
            <div
              key={i}
              className="flex flex-row items-center gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-[#1E88E5]/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              {/* Image Container: Fixed Size (w-32 h-32) */}
              <div className="w-32 h-32 rounded-2xl bg-slate-100 flex-shrink-0 overflow-hidden shadow-inner">
                {e.image ? (
                  <img
                    src={e.image}
                    alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300 italic text-xs">
                    No Image
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="flex-1">
                {/* Optional Date & Location Badges */}
                <div className="flex gap-3 mb-2">
                  {e.date && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500 uppercase tracking-tighter">
                      <Calendar size={10} /> {e.date}
                    </span>
                  )}
                  {e.location && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      <MapPin size={10} /> {e.location}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-[#1E88E5] transition-colors leading-tight">
                  {e.title}
                </h3>

                <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {e.description || "Join us for this amazing school event and celebrate the spirit of excellence."}
                </p>

                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 text-[10px] font-black text-[#1E88E5] uppercase tracking-[0.2em] hover:gap-4 transition-all"
                >
                  Explore <Icons.Camera className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FIELD TRIPS: IMMERSIVE CALL TO ACTION */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-[#1E88E5] rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-white shadow-2xl shadow-blue-200">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="p-4 bg-white/20 backdrop-blur-xl rounded-2xl mb-8">
              <Icons.Map className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 italic">{data.fieldTrip.title}</h2>
            <p className="max-w-2xl text-blue-100 text-lg mb-10 leading-relaxed">
              {data.fieldTrip.description}
            </p>
            <Link to="/contact" className="bg-white text-[#1E88E5] px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95">
              View Trip Logs
            </Link>
          </div>
        </div>
      </section>

    </div>

  );
};

export default ActivitiesPage;