import React, { useState, useEffect } from 'react';
import { 
  Megaphone, Plus, Trash2, FileText, Calendar, 
  Award, Bell, Clock, UploadCloud, Loader2, AlertCircle 
} from 'lucide-react';
import { fetchNews, createNews, deleteNews, API_BASE_URL } from "../../utils/api";

export default function NewsAdmin() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Announcement");
  const [description, setDescription] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchNews();
      setNews(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category) return alert("Title and Category are required!");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("category", category);
    fd.append("description", description);
    fd.append("fullContent", fullContent);
    fd.append("urgent", isUrgent);
    if (file) fd.append("file", file);

    try {
      setUploading(true);
      await createNews(fd);
      // Reset Form
      setTitle(""); setDescription(""); setFullContent(""); 
      setFile(null); setIsUrgent(false);
      if(document.getElementById('news-file')) document.getElementById('news-file').value = "";
      
      loadData(); // Refresh List
      alert("News published successfully! 🚀");
    } catch (err) {
      alert("Error uploading news");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this update?")) {
      await deleteNews(id);
      loadData();
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10 font-sans">
      
      {/* 1. Header */}
      <header className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">News & Updates Admin</h1>
          <p className="text-slate-500 font-medium">Broadcast circulars, announcements, and achievements.</p>
        </div>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl font-bold text-sm flex items-center gap-2">
           <Megaphone size={18} /> Live on Portal
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* 2. Upload Form (Left Side) */}
        <div className="lg:col-span-1 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
              <Plus className="text-blue-600" size={20} /> Create New Update
            </h2>

            <input 
              className="w-full p-3.5 rounded-2xl border bg-slate-50 focus:bg-white focus:ring-2 ring-blue-100 outline-none transition-all text-sm"
              placeholder="News Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select 
              className="w-full p-3.5 rounded-2xl border bg-slate-50 outline-none text-sm font-medium"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Announcement">Announcement</option>
              <option value="Circular">Circular / PDF Notice</option>
              <option value="Exam">Exam Update</option>
              <option value="Holiday">Holiday Notice</option>
              <option value="Achievement">Student Achievement</option>
            </select>

            <textarea 
              className="w-full p-3.5 rounded-2xl border bg-slate-50 focus:bg-white outline-none text-sm h-20"
              placeholder="Short Description (visible on card)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <textarea 
              className="w-full p-3.5 rounded-2xl border bg-slate-50 focus:bg-white outline-none text-sm h-32"
              placeholder="Detailed Content (visible in popup)"
              value={fullContent}
              onChange={(e) => setFullContent(e.target.value)}
            />

            {/* File Upload */}
            <div className="border-2 border-dashed border-slate-200 p-4 rounded-2xl bg-slate-50/50">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Optional PDF Attachment</label>
              <input 
                id="news-file"
                type="file" 
                accept="application/pdf"
                onChange={handleFileChange}
                className="text-xs file:bg-blue-600 file:text-white file:border-0 file:px-3 file:py-1.5 file:rounded-lg file:mr-3 cursor-pointer"
              />
            </div>

            {/* Urgent Toggle */}
            <div className="flex items-center gap-3 p-2">
              <input 
                type="checkbox" 
                id="urgent"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-5 h-5 accent-orange-500" 
              />
              <label htmlFor="urgent" className="text-sm font-bold text-slate-700">Mark as Urgent (Red Border)</label>
            </div>

            <button 
              disabled={uploading}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all
              ${uploading ? 'bg-slate-400' : 'bg-slate-900 hover:bg-blue-600'}`}
            >
              {uploading ? "Publishing..." : "Post Update Now"}
            </button>
          </form>
        </div>

        {/* 3. List View (Right Side) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-700 px-2 flex items-center justify-between">
            Recent Posts
            <span className="text-xs bg-slate-200 px-2 py-1 rounded-lg">{news.length} Total</span>
          </h3>

          {loading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>
          ) : news.length === 0 ? (
            <div className="text-center p-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No news updates posted yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {news.map((n) => (
                <div 
                  key={n._id} 
                  className={`bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all ${n.urgent ? 'border-l-4 border-l-orange-500' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 leading-tight">{n.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black uppercase text-blue-500 bg-blue-50 px-2 py-0.5 rounded">{n.category}</span>
                        <span className="text-xs text-slate-400">{n.date}</span>
                        {n.fileUrl && <FileText size={14} className="text-emerald-500" title="PDF Attached" />}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDelete(n._id)}
                    className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}