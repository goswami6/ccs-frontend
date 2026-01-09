import { useState } from "react";
import { uploadDisclosure } from "../../utils/api";
import { FileText, UploadCloud, Link as LinkIcon, CheckCircle, Globe } from "lucide-react";

export default function DocumentUploader({
  label = "Upload Document",
  category = "mandatory",
  onUploaded,
}) {
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("");
  const [file, setFile] = useState(null);
  const [externalUrl, setExternalUrl] = useState(""); // URL input ke liye
  const [uploadMode, setUploadMode] = useState("file"); // 'file' ya 'url'
  const [loading, setLoading] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSize(formatFileSize(selectedFile.size));
    }
  };

  const upload = async () => {
    // Validation
    if (!title) return alert("Please enter a document title");
    if (uploadMode === "file" && !file) return alert("Please select a PDF file");
    if (uploadMode === "url" && !externalUrl) return alert("Please enter a PDF URL");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("category", category);
    
    if (uploadMode === "file") {
      fd.append("file", file);
      fd.append("size", size);
    } else {
      // URL mode mein hum fileUrl direct bhej rahe hain (Backend handles this)
      fd.append("fileUrl", externalUrl);
      fd.append("size", "External Link");
    }

    try {
      setLoading(true);
      const doc = await uploadDisclosure(fd);

      // Reset
      setTitle("");
      setSize("");
      setFile(null);
      setExternalUrl("");
      if(document.getElementById('pdf-input')) document.getElementById('pdf-input').value = "";

      if (onUploaded) onUploaded(doc);
      alert("Document saved successfully! ✅");
    } catch (err) {
      console.error(err);
      alert("Error saving document ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 border-2 border-dashed border-slate-200 p-6 rounded-[2rem] bg-slate-50/50">
      {/* --- Header & Tabs --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <UploadCloud size={20} className="text-blue-600" />
          <label className="text-sm font-black uppercase tracking-wider text-slate-700">{label}</label>
        </div>
        
        <div className="flex bg-slate-200/50 p-1 rounded-xl">
          <button 
            onClick={() => setUploadMode("file")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${uploadMode === 'file' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >
            File Upload
          </button>
          <button 
            onClick={() => setUploadMode("url")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${uploadMode === 'url' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >
            Link URL
          </button>
        </div>
      </div>

      {/* --- Common Inputs --- */}
      <div className="grid gap-4">
        <input
          className="border-slate-200 border p-3.5 w-full rounded-2xl bg-white text-sm focus:ring-2 ring-blue-100 outline-none font-medium transition-all"
          placeholder="Document Title (e.g. Balance Sheet 2024)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* --- Conditional Inputs based on Mode --- */}
        {uploadMode === "file" ? (
          <div className="space-y-4">
            <input
              className="border-slate-200 border p-3.5 w-full rounded-2xl bg-slate-100 text-sm text-slate-500 cursor-not-allowed font-medium"
              placeholder="Size (Auto-calculated)"
              value={size}
              readOnly
            />
            <div className="relative group bg-white border border-slate-200 p-4 rounded-2xl">
              <input
                id="pdf-input"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            <Globe className="absolute left-4 top-4 text-slate-400" size={18} />
            <input
              className="border-slate-200 border p-3.5 pl-12 w-full rounded-2xl bg-white text-sm focus:ring-2 ring-blue-100 outline-none font-medium transition-all"
              placeholder="Paste PDF Link (https://example.com/file.pdf)"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* --- Action Button --- */}
      <button
        onClick={upload}
        disabled={loading}
        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg
          ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-blue-600 text-white shadow-blue-200'}`}
      >
        {loading ? "Processing..." : <><CheckCircle size={18} /> Save Disclosure</>}
      </button>

      {uploadMode === "file" && file && (
        <p className="text-[10px] text-center text-emerald-600 font-bold uppercase tracking-tighter">
           Selected: {file.name} ({size})
        </p>
      )}
    </div>
  );
}