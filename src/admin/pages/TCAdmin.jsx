import React, { useState } from 'react';
import { Upload, UserPlus, FileText, Loader2, CheckCircle, XCircle } from 'lucide-react';
// Import your API function
import { uploadStudentTC } from '../../utils/api'; 

const TCAdmin = () => {
  const [formData, setFormData] = useState({
    studentName: '', session: '2024-25', regNo: '', dob: '', fileType: 'pdf'
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");

    setLoading(true);
    setStatus({ type: '', msg: '' });

    const data = new FormData();
    data.append('studentName', formData.studentName);
    data.append('session', formData.session);
    data.append('regNo', formData.regNo);
    data.append('dob', formData.dob);
    data.append('fileType', formData.fileType);
    data.append('file', file);

    try {
      await uploadStudentTC(data);
      setStatus({ type: 'success', msg: 'TC Uploaded & Record Saved Successfully!' });
      // Reset form
      setFormData({ studentName: '', session: '2024-25', regNo: '', dob: '', fileType: 'pdf' });
      setFile(null);
      e.target.reset(); // Clear file input
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: 'error', 
        msg: err.response?.data?.message || "Upload failed. Check if Reg No already exists." 
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: '', msg: '' }), 5000);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto font-sans min-h-screen bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            TC <span className="text-blue-600">Generator</span>
          </h1>
          <p className="text-slate-500 text-sm">Upload and manage digital Transfer Certificates</p>
        </div>
      </div>

      {status.msg && (
        <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2 ${
          status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {status.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
          {status.msg}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Student Full Name</label>
          <input 
            required 
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. Rahul Kumar" 
            value={formData.studentName} 
            onChange={e => setFormData({...formData, studentName: e.target.value})} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Registration Number</label>
          <input 
            required 
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. BNS/2024/001" 
            value={formData.regNo} 
            onChange={e => setFormData({...formData, regNo: e.target.value})} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Date of Birth</label>
          <input 
            type="date" 
            required 
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.dob} 
            onChange={e => setFormData({...formData, dob: e.target.value})} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Academic Session</label>
          <select 
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none" 
            value={formData.session} 
            onChange={e => setFormData({...formData, session: e.target.value})}
          >
            <option>2023-24</option>
            <option>2024-25</option>
            <option>2025-26</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">File Format</label>
          <div className="flex gap-3">
            {['pdf', 'image'].map(type => (
              <button 
                key={type} 
                type="button" 
                onClick={() => setFormData({...formData, fileType: type})}
                className={`flex-1 p-3 rounded-xl font-bold capitalize transition-all ${
                  formData.fileType === type ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Select File</label>
          <div className="relative group">
            <input 
              type="file" 
              required 
              onChange={e => setFile(e.target.files[0])} 
              accept={formData.fileType === 'pdf' ? '.pdf' : 'image/*'} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="p-3 border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 group-hover:border-blue-400 transition-colors">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Upload size={18} />
              </div>
              <span className="text-xs font-bold text-slate-500 truncate">
                {file ? file.name : "Click to upload TC"}
              </span>
            </div>
          </div>
        </div>

        <button 
          disabled={loading} 
          className="md:col-span-2 w-full mt-4 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 shadow-xl shadow-slate-200"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              <UserPlus size={20} /> GENERATE & SAVE TC
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TCAdmin;