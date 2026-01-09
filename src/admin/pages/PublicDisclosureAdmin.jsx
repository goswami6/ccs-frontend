import { useEffect, useState } from "react";
import {
  fetchDisclosures,
  deleteDisclosure,
  uploadDisclosure, // API se is function ka hona zaroori hai
  API_BASE_URL,
} from "../../utils/api";
import DocumentUploader from "../components/DocumentUploader";
import { ExternalLink, Trash2, FileText, Loader2, Info, PlusCircle } from "lucide-react";

export default function PublicDisclosureAdmin() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadMode, setUploadMode] = useState("document"); // "document" or "general"
  
  // General Info Form State
  const [generalInfo, setGeneralInfo] = useState({ title: "", value: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchDisclosures();
      setDocs(res || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // General info ke liye file null bhejenge
      const formData = new FormData();
      formData.append("title", generalInfo.title);
      formData.append("value", generalInfo.value);
      formData.append("category", "general");

      await uploadDisclosure(formData);
      setGeneralInfo({ title: "", value: "" });
      load();
      alert("General information added!");
    } catch (err) {
      alert("Failed to add information");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPdfUrl = (fileUrl) => {
    if (!fileUrl) return "#";
    const base = API_BASE_URL.replace('/api', '').endsWith("/") 
      ? API_BASE_URL.replace('/api', '').slice(0, -1) 
      : API_BASE_URL.replace('/api', '');
    return `${base}${fileUrl}`;
  };

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-10 font-sans">
      <header className="border-b pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Disclosure Admin</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage School Info & Mandatory Documents.</p>
        </div>
      </header>

      {/* --- SWITCHER & UPLOAD SECTION --- */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl w-fit">
          <button 
            onClick={() => setUploadMode("document")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${uploadMode === 'document' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            Upload PDF
          </button>
          <button 
            onClick={() => setUploadMode("general")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${uploadMode === 'general' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            General Info
          </button>
        </div>

        {uploadMode === "document" ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              <h2 className="text-lg font-bold text-slate-800">New Document</h2>
            </div>
            <DocumentUploader
              label="Select PDF Disclosure"
              category="mandatory"
              onUploaded={() => load()} 
            />
          </div>
        ) : (
          <form onSubmit={handleGeneralSubmit} className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Info className="text-blue-600" size={20} />
              <h2 className="text-lg font-bold text-slate-800">New General Detail</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                required
                className="p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Label (e.g. PRINCIPAL NAME)"
                value={generalInfo.title}
                onChange={(e) => setGeneralInfo({...generalInfo, title: e.target.value})}
              />
              <input 
                required
                className="p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Value (e.g. Mr. Anand Singh)"
                value={generalInfo.value}
                onChange={(e) => setGeneralInfo({...generalInfo, value: e.target.value})}
              />
            </div>
            <button 
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all disabled:bg-slate-300"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <PlusCircle size={18} />}
              Add Information
            </button>
          </form>
        )}
      </div>

      {/* --- DOCUMENT & INFO LIST --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-700 px-2">Manage All Records ({docs.length})</h3>
        
        {loading ? (
          <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
        ) : (
          <div className="grid gap-3">
            {docs.map((d) => (
              <div key={d._id} className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${d.category === 'general' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                    {d.category === 'general' ? <Info size={24} /> : <FileText size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{d.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${d.category === 'general' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                        {d.category}
                      </span>
                      {d.category === 'general' ? (
                        <span className="text-sm text-slate-600 font-medium">{d.value}</span>
                      ) : (
                        <a href={getPdfUrl(d.fileUrl)} target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline">
                          <ExternalLink size={12} /> View PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    if (window.confirm("Delete this record?")) {
                      await deleteDisclosure(d._id);
                      load();
                    }
                  }}
                  className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}