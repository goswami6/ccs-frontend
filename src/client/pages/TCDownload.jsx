import React, { useState } from 'react';
import { Search, Download, FileText, AlertCircle, Loader2 } from 'lucide-react';
// API functions aur Base URL ko import karein
import { searchStudentTC, API_BASE_URL } from "../../utils/api";

const TCDownload = () => {
  const [query, setQuery] = useState({ regNo: '', dob: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      // utils/api se call karein
      const res = await searchStudentTC(query);
      setResult(res.data);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.message || "Record not found. Please verify details.");
    } finally {
      setLoading(false);
    }
  };

  // File URL generator helper
  const getFileUrl = (path) => {
    if (!path) return "#";
    // Base URL se /api hatakar pure path banayein
    const base = API_BASE_URL.replace('/api', '').endsWith("/") 
      ? API_BASE_URL.replace('/api', '').slice(0, -1) 
      : API_BASE_URL.replace('/api', '');
    return `${base}${path}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 font-sans">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-blue-100 text-blue-600 rounded-2xl mb-4">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            Student <span className="text-blue-600">TC Portal</span>
          </h1>
          <p className="text-slate-500 font-medium">Download your Transfer Certificate securely</p>
        </div>

        {/* SEARCH FORM */}
        <form 
          onSubmit={handleSearch} 
          className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6 relative overflow-hidden"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Registration Number</label>
            <input 
              required 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold placeholder:font-normal" 
              placeholder="e.g. BNS/2024/101" 
              value={query.regNo} 
              onChange={e => setQuery({...query, regNo: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Date of Birth</label>
            <input 
              type="date" 
              required 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold" 
              value={query.dob} 
              onChange={e => setQuery({...query, dob: e.target.value})} 
            />
          </div>
          <button 
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:bg-slate-300"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            {loading ? "SEARCHING..." : "FIND MY CERTIFICATE"}
          </button>
        </form>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 font-bold text-sm border border-red-100 animate-in fade-in zoom-in duration-300">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {/* SEARCH RESULT CARD */}
        {result && (
          <div className="mt-8 bg-white p-6 rounded-[2.5rem] border-2 border-emerald-100 shadow-xl shadow-emerald-900/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <FileText size={32} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-xl">{result.studentName}</h3>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-500 uppercase">
                    Session {result.session}
                  </span>
                  <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded font-bold text-emerald-600 uppercase">
                    Verified
                  </span>
                </div>
              </div>
            </div>
            
            <a 
              href={getFileUrl(result.fileUrl)} 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
            >
              <Download size={20} /> {result.fileType === 'pdf' ? 'DOWNLOAD PDF' : 'VIEW TC IMAGE'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TCDownload;