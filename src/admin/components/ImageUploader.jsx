import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check } from "lucide-react";

export default function ImageUploader({
  folder = "images",
  onUpload,
  label = "Upload Image",
}) {
  const [mode, setMode] = useState("upload");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (mode === "upload" && !file) {
      alert("Please select an image");
      return;
    }
    if (mode === "url" && !url) {
      alert("Please enter image URL");
      return;
    }

    const formData = new FormData();
    formData.append("folder", folder);

    if (mode === "upload") {
      formData.append("image", file);
    } else {
      formData.append("image", url);
    }

    try {
      setLoading(true);
      await onUpload(formData);
      setFile(null);
      setUrl("");
      setPreview("");
    } finally {
      setLoading(false);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setUrl("");
    setPreview("");
  };

  return (
    <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-5">
      
      {/* HEADER & LABEL */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
          {label}
        </h3>
        {preview && (
          <button 
            onClick={clearSelection}
            className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* MODE SWITCHER */}
      <div className="flex p-1 bg-slate-100 rounded-xl">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
            mode === "upload" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Upload size={14} /> File Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
            mode === "url" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <LinkIcon size={14} /> Image URL
        </button>
      </div>

      {/* INPUT AREA */}
      <div className="relative">
        {mode === "upload" ? (
          <div className="group relative border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-8 transition-all bg-slate-50/50 text-center">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) {
                  setFile(f);
                  setPreview(URL.createObjectURL(f));
                }
              }}
            />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-slate-400 group-hover:text-blue-500 transition-colors">
                <ImageIcon size={24} />
              </div>
              <p className="text-sm font-bold text-slate-600">Click to browse</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">PNG, JPG up to 5MB</p>
            </div>
          </div>
        ) : (
          <div className="relative">
             <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input
              type="text"
              placeholder="Paste image address (https://...)"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setPreview(e.target.value);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
        )}
      </div>

      {/* PREVIEW BOX */}
      <AnimatePresence>
        {preview && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-2xl overflow-hidden border border-slate-100 bg-slate-900"
          >
            <img
              src={preview}
              alt="preview"
              className="w-full h-44 object-contain opacity-90"
            />
            <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
              <Check size={12} strokeWidth={4} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SAVE BUTTON */}
      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
          loading 
            ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
            : "bg-slate-900 text-white hover:bg-emerald-600 shadow-slate-200"
        }`}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
            Syncing to {folder}...
          </>
        ) : (
          "Apply Changes"
        )}
      </button>
    </div>
  );
}