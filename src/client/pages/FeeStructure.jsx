import React, { useState, useEffect } from 'react';
import { CheckCircle2, CreditCard, Download, AlertCircle, Calendar, Loader2 } from 'lucide-react';
// API functions ko import karein
import { fetchFees, API_BASE_URL } from "../../utils/api"; 

const FeeStructure = () => {
  const [feeData, setFeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFees = async () => {
      try {
        const data = await fetchFees();
        setFeeData(data || []);
      } catch (err) {
        console.error("Failed to load fees", err);
      } finally {
        setLoading(false);
      }
    };
    loadFees();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans pb-24">
      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 pt-32 pb-20 px-6 rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Transparency First</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Fee <span className="text-[#C62828]">Structure</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Academic Session 2025-26. Competitive pricing for world-class education.
          </p>
        </div>
      </section>

      {/* 2. DYNAMIC FEE CARDS */}
      <main className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feeData.map((item, index) => (
            <div key={item._id || index} className={`relative bg-white border-t-8 ${item.color || 'border-blue-500'} rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 flex flex-col`}>
              <div className={`${item.bg || 'bg-blue-50'} w-fit px-4 py-1 rounded-full mb-4`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">{item.classes}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6">{item.level}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-slate-500 text-sm">Admission Fee</span>
                  <span className="font-bold text-slate-900">{item.admissionFee}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="text-slate-500 text-sm">Tuition Fee</span>
                  <span className="font-bold text-[#1E88E5]">{item.tuitionFee}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow text-xs font-medium text-slate-600">
                {['Digital Classrooms', 'Library', 'Sports', 'Lab Access'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>

              {/* PDF DOWNLOAD BUTTON */}
              {item.pdfUrl && (
                <a 
                  href={`${API_BASE_URL.replace('/api', '')}${item.pdfUrl}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group"
                >
                  Download Schedule <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* 3. NOTES & PAYMENTS (Original UI) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100">
             <div className="flex items-center gap-3 mb-6 text-amber-700">
               <AlertCircle size={24} />
               <h4 className="text-xl font-bold uppercase tracking-tight">Important Notes</h4>
             </div>
             <ul className="space-y-4 text-sm text-amber-900/70 font-medium">
               <li>• Transportation charges are extra based on distance.</li>
               <li>• Fees must be paid by the 10th of every month.</li>
             </ul>
           </div>

           <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200">
             <div className="flex items-center gap-3 mb-6 text-slate-800">
               <CreditCard size={24} />
               <h4 className="text-xl font-bold uppercase tracking-tight">Payment Options</h4>
             </div>
             <div className="flex gap-4">
                <div className="bg-white p-4 rounded-2xl flex-1 text-center font-bold text-xs shadow-sm">Online Portal</div>
                <div className="bg-white p-4 rounded-2xl flex-1 text-center font-bold text-xs shadow-sm">Cash/Cheque</div>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default FeeStructure;