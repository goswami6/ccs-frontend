import React, { useState, useEffect } from 'react';
import { Save, Globe, Phone, MapPin, Clock, Facebook, Instagram, Youtube, Twitter, Loader2, CheckCircle, Mail } from 'lucide-react';
// API functions ko import karein
import { fetchSettings, updateSettings } from '../../utils/api';

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    schoolName: '', address: '', phone: '', email: '', workingHours: '',
    facebook: '', instagram: '', youtube: '', twitter: ''
  });
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetchSettings();
      if (res.data) setFormData(res.data);
    } catch (err) {
      console.error("Error loading settings:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // FormData object create karein file upload ke liye
    const data = new FormData();
    Object.keys(formData).forEach(key => {
        // Sirf wahi fields bhejrein jo null nahi hain
        if (formData[key] !== null) data.append(key, formData[key]);
    });
    
    if (logo) data.append('logo', logo);

    try {
      await updateSettings(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Error saving settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Site <span className="text-blue-600">Configuration</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm">Update your school identity and contact info</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-right-4">
            <CheckCircle size={18} /> Settings Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        
        {/* BRANDING SECTION */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Globe size={22}/></div>
            <h2 className="font-black text-lg text-slate-800 uppercase tracking-tight">Branding & Identity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">School / Institution Name</label>
              <input 
                required
                className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
                value={formData.schoolName} 
                onChange={e => setFormData({...formData, schoolName: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Update Logo (PNG/JPG)</label>
              <div className="relative group">
                 <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setLogo(e.target.files[0])} 
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-blue-600 file:text-white hover:file:bg-slate-900 transition-all cursor-pointer" 
                 />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl"><Phone size={22}/></div>
            <h2 className="font-black text-lg text-slate-800 uppercase tracking-tight">Contact Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Physical Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                <input className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700" 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                />
              </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Contact Phone</label>
                <div className="relative">
                    <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
                    <input className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
                    <input className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
            </div>
            <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Office / Working Hours</label>
                <div className="relative">
                    <Clock className="absolute left-4 top-4 text-slate-400" size={18} />
                    <input className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500" 
                    value={formData.workingHours}
                    onChange={e => setFormData({...formData, workingHours: e.target.value})} />
                </div>
            </div>
          </div>
        </section>

        {/* SOCIAL MEDIA SECTION */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-pink-50 text-pink-600 rounded-xl"><Instagram size={22}/></div>
            <h2 className="font-black text-lg text-slate-800 uppercase tracking-tight">Social Media Ecosystem</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute left-4 top-4 w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Facebook size={16} />
              </div>
              <input placeholder="Facebook Profile URL" className="w-full pl-16 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-4 w-8 h-8 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center">
                <Instagram size={16} />
              </div>
              <input placeholder="Instagram Profile URL" className="w-full pl-16 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-4 w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                <Youtube size={16} />
              </div>
              <input placeholder="YouTube Channel URL" className="w-full pl-16 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.youtube} onChange={e => setFormData({...formData, youtube: e.target.value})} />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-4 w-8 h-8 bg-blue-50 text-blue-400 rounded-lg flex items-center justify-center">
                <Twitter size={16} />
              </div>
              <input placeholder="Twitter Profile URL" className="w-full pl-16 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} />
            </div>
          </div>
        </section>

        {/* FLOATING SAVE BUTTON */}
        <button 
            disabled={loading} 
            className="fixed bottom-10 right-10 px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-3 z-50 disabled:bg-slate-300"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {loading ? "SAVING CHANGES..." : "DEPLOY UPDATES"}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;