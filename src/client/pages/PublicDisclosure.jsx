import React, { useEffect, useState } from 'react';
import { FileText, Download, ShieldCheck, ExternalLink, Info, CheckCircle, Loader2, MapPin, Phone, Mail, User } from 'lucide-react';
import { fetchDisclosures, API_BASE_URL } from "../../utils/api";

const PublicDisclosure = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDocs = async () => {
      try {
        const data = await fetchDisclosures();
        setDocs(data || []);
      } catch (err) {
        console.error("Error fetching disclosures:", err);
      } finally {
        setLoading(false);
      }
    };
    getDocs();
  }, []);

  const getPdfUrl = (fileUrl) => {
    if (!fileUrl) return "#";
    const base = API_BASE_URL.replace('/api', '').endsWith("/") 
      ? API_BASE_URL.replace('/api', '').slice(0, -1) 
      : API_BASE_URL.replace('/api', '');
    return `${base}${fileUrl}`;
  };

  // Logic: Split data into three categories
  const generalInfo = docs.filter(d => d.category === "general");
  const mandatoryDocuments = docs.filter(d => d.category === "mandatory");
  const academicInfo = docs.filter(d => d.category === "academic");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Transparency & Compliance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Public <span className="text-blue-500">Disclosure</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Updated information for the academic session 2025-26 as per regulatory guidelines.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 pb-24 z-40">
        
        {/* --- 1. GENERAL INFORMATION TABLE --- */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden mb-16 ">
          <div className="bg-blue-600 p-6 md:p-8 flex items-center gap-4">
             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Info className="text-white" size={24} />
             </div>
             <div>
                <h2 className="text-white font-bold text-xl">General Information</h2>
                <p className="text-blue-100 text-xs">Essential school details and contact information</p>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-5 text-[10px] uppercase font-black text-slate-400 tracking-widest w-1/3">Information Label</th>
                  <th className="p-5 text-[10px] uppercase font-black text-slate-400 tracking-widest">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {generalInfo.length > 0 ? generalInfo.map((info) => (
                  <tr key={info._id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-5 font-bold text-slate-700 text-sm">{info.title}</td>
                    <td className="p-5 text-slate-600 text-sm leading-relaxed">{info.value}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="2" className="p-10 text-center text-slate-400 italic">No general information available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- 2. DOCUMENTS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Mandatory Documents Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
                <div className="h-6 w-1 bg-red-600 rounded-full"></div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Required Documents</h3>
            </div>
            
            <div className="grid gap-4">
              {mandatoryDocuments.map((doc) => (
                <a key={doc._id} href={getPdfUrl(doc.fileUrl)} target="_blank" rel="noreferrer" 
                   className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                        <FileText size={20} />
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-800 text-sm">{doc.title}</h5>
                        <p className="text-[10px] text-slate-400 font-bold">PDF DOCUMENT</p>
                    </div>
                  </div>
                  <Download size={18} className="text-slate-300 group-hover:text-blue-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Academic Info Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
                <div className="h-6 w-1 bg-emerald-500 rounded-full"></div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Academic Records</h3>
            </div>

            <div className="grid gap-4">
              {academicInfo.map((doc) => (
                <a key={doc._id} href={getPdfUrl(doc.fileUrl)} target="_blank" rel="noreferrer"
                   className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-800 text-sm">{doc.title}</h5>
                        <p className="text-[10px] text-emerald-600/60 font-bold uppercase tracking-widest">Official Record</p>
                    </div>
                  </div>
                  <ExternalLink size={18} className="text-slate-300 group-hover:text-emerald-600" />
                </a>
              ))}
              
              {/* Static CTA Card */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-lg mt-4">
                  <h4 className="font-bold text-lg mb-2">School Infrastructure</h4>
                  <p className="text-slate-400 text-xs mb-4">Our campus is spread across lush green land with world-class facilities for academic and sports excellence.</p>
                  <div className="flex justify-between items-center text-blue-400">
                      <span className="text-[10px] font-black tracking-widest uppercase">Verified 2025</span>
                      <Info size={16} />
                  </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PublicDisclosure;