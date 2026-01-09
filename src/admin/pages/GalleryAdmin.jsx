import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Image as ImageIcon, Video, Loader2, CheckCircle, AlertCircle, Plus } from 'lucide-react';
// API functions aur API_BASE_URL import kiya
import { fetchGalleryItems, uploadGalleryMedia, deleteGalleryItem, API_BASE_URL } from '../../utils/api';

const GalleryAdmin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const [formData, setFormData] = useState({ title: '', category: 'Events', type: 'image' });
  const [file, setFile] = useState(null);

  useEffect(() => { 
    loadItems(); 
  }, []);

  const loadItems = async () => {
    try {
      const res = await fetchGalleryItems();
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Error", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function for dynamic URL 
  const getFullUrl = (path) => {
    if (!path) return "";
    const baseUrl = API_BASE_URL.replace('/api', '').endsWith('/') 
      ? API_BASE_URL.replace('/api', '').slice(0, -1) 
      : API_BASE_URL.replace('/api', '');
    const filePath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${filePath}`;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    setUploading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('type', formData.type);
    data.append('file', file);

    try {
      await uploadGalleryMedia(data);
      setStatus({ type: 'success', msg: 'Media uploaded successfully!' });
      setFormData({ title: '', category: 'Events', type: 'image' });
      setFile(null);
      loadItems();
    } catch (err) {
      console.error("Upload Error", err);
      setStatus({ type: 'error', msg: 'Upload failed. Check file size/type.' });
    } finally {
      setUploading(false);
      setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteGalleryItem(id);
      setItems(items.filter(item => item._id !== id));
      setStatus({ type: 'success', msg: 'Item deleted!' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Delete failed' });
    } finally {
      setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Gallery <span className="text-blue-600">Manager</span>
          </h1>
          <p className="text-slate-500">Add or remove images and videos from the school website</p>
        </div>
        {status.msg && (
          <div className={`fixed top-10 right-10 z-50 flex items-center gap-2 px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-300 ${
            status.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {status.msg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* UPLOAD FORM */}
        <div className="lg:col-span-1">
          <form onSubmit={handleUpload} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 sticky top-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Plus size={20} className="text-blue-600" /> New Upload
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400">Title</label>
                <input 
                  required 
                  className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="Event Name" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                <select 
                  className="w-full mt-1 p-3 bg-slate-50 border-none rounded-xl outline-none" 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Events</option>
                  <option>Sports</option>
                  <option>Campus</option>
                  <option>Classrooms</option>
                  <option>Academic</option>
                  <option>Creative</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400">Media Type</label>
                <div className="flex gap-2 mt-1">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, type: 'image'})} 
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all ${formData.type === 'image' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}
                  >
                    <ImageIcon size={14} /> Image
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, type: 'video'})} 
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all ${formData.type === 'video' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}
                  >
                    <Video size={14} /> Video
                  </button>
                </div>
              </div>

              <div className="relative group">
                <input 
                  type="file" 
                  required 
                  accept={formData.type === 'image' ? "image/*" : "video/*"}
                  onChange={e => setFile(e.target.files[0])} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="border-2 border-dashed border-slate-200 group-hover:border-blue-400 group-hover:bg-blue-50 rounded-2xl p-6 text-center transition-all">
                  <Upload className="mx-auto text-slate-300 mb-2" />
                  <p className="text-xs font-bold text-slate-500">{file ? file.name : "Choose File"}</p>
                </div>
              </div>

              <button 
                disabled={uploading} 
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {uploading ? <Loader2 className="animate-spin" /> : "Start Upload"}
              </button>
            </div>
          </form>
        </div>

        {/* ITEMS LIST */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-slate-400 font-medium">Syncing Gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map(item => (
                <div key={item._id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-md transition-all">
                  <div className="h-48 relative overflow-hidden">
                    {item.type === 'image' ? (
                      <img 
                        src={getFullUrl(item.fileUrl)} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                        alt="" 
                      />
                    ) : (
                      <video 
                        src={getFullUrl(item.fileUrl)} 
                        className="w-full h-full object-cover" 
                        muted
                      />
                    )}
                    <div className="absolute top-4 right-4">
                      <button 
                        onClick={() => handleDelete(item._id)} 
                        className="p-2 bg-white/90 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                       <span className="px-3 py-1 bg-white/90 text-[10px] font-black uppercase rounded-lg shadow-sm border border-slate-100">
                         {item.category}
                       </span>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 truncate pr-2">{item.title}</h4>
                    {item.type === 'video' ? <Video size={16} className="text-blue-500" /> : <ImageIcon size={16} className="text-slate-400" />}
                  </div>
                </div>
              ))}
              
              {items.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400">
                  No media items found. Start uploading!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryAdmin;