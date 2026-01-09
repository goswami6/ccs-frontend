import React, { useState, useEffect } from 'react';
import { Save, UploadCloud, Loader2, CheckCircle, AlertCircle, Pencil, Plus } from 'lucide-react';
import { fetchFees, updateFee } from '../../utils/api'; // API file mein endpoint /save rakhein

const FeeAdmin = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFee, setSelectedFee] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial Empty State for New Entries
  const emptyFee = {
    level: '',
    classes: '',
    admissionFee: '',
    tuitionFee: '',
    color: 'border-blue-500',
    bg: 'bg-blue-50'
  };

  useEffect(() => { loadFees(); }, []);

  const loadFees = async () => {
    setLoading(true);
    const data = await fetchFees();
    if (data) setFees(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', msg: '' });

    const formData = new FormData();
    if (selectedFee._id) formData.append("id", selectedFee._id);
    formData.append("level", selectedFee.level);
    formData.append("classes", selectedFee.classes);
    formData.append("admissionFee", selectedFee.admissionFee);
    formData.append("tuitionFee", selectedFee.tuitionFee);
    formData.append("color", selectedFee.color);
    formData.append("bg", selectedFee.bg);
    if (file) formData.append("pdf", file);

    try {
      // updateFee function ko call karein (jo /save endpoint pe hit karega)
      await updateFee(formData); 
      setStatus({ type: 'success', msg: 'Fee data successfully saved!' });
      await loadFees();
      setTimeout(() => setSelectedFee(null), 1500);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Error saving data.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Fee <span className="text-blue-600">Admin</span></h1>
          <p className="text-slate-500">Manage structure & schedules</p>
        </div>
        <button 
          onClick={() => { setSelectedFee(emptyFee); setFile(null); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} /> Add New Level
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LIST SECTION */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase text-slate-400">Existing Levels</h3>
          {fees.map((f) => (
            <button 
              key={f._id} 
              onClick={() => { setSelectedFee(f); setFile(null); }}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex justify-between items-center ${selectedFee?._id === f._id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
            >
              <div>
                <p className="font-bold text-slate-800">{f.level}</p>
                <p className="text-[10px] text-slate-500 uppercase">{f.classes}</p>
              </div>
              <Pencil size={14} className="text-slate-300" />
            </button>
          ))}
        </div>

        {/* FORM SECTION */}
        <div className="lg:col-span-2">
          {selectedFee ? (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-5">
              <h2 className="font-black text-slate-800 text-xl">{selectedFee._id ? 'Edit' : 'Add New'} Level</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Level Name</label>
                  <input required className="w-full p-3 border rounded-xl mt-1" placeholder="e.g. Pre-Primary" value={selectedFee.level} onChange={(e)=>setSelectedFee({...selectedFee, level: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Classes Includes</label>
                  <input required className="w-full p-3 border rounded-xl mt-1" placeholder="e.g. Nursery, LKG, UKG" value={selectedFee.classes} onChange={(e)=>setSelectedFee({...selectedFee, classes: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Admission Fee</label>
                  <input required className="w-full p-3 border rounded-xl mt-1" placeholder="₹5,000" value={selectedFee.admissionFee} onChange={(e)=>setSelectedFee({...selectedFee, admissionFee: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Tuition Fee</label>
                  <input required className="w-full p-3 border rounded-xl mt-1" placeholder="₹1,200 / month" value={selectedFee.tuitionFee} onChange={(e)=>setSelectedFee({...selectedFee, tuitionFee: e.target.value})} />
                </div>
              </div>

              {/* PDF UPLOAD */}
              <div className="border-2 border-dashed rounded-2xl p-6 text-center relative hover:bg-slate-50 transition-colors">
                <input type="file" accept=".pdf" onChange={(e)=>setFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                <UploadCloud className="mx-auto text-slate-300 mb-2" />
                <span className="text-sm font-bold text-slate-600">{file ? file.name : "Upload PDF Schedule"}</span>
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 disabled:bg-slate-300">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={18} />} Save Data
                </button>
                <button type="button" onClick={()=>setSelectedFee(null)} className="px-6 py-4 bg-slate-100 rounded-xl font-bold">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="h-full min-h-[300px] border-2 border-dashed rounded-[3rem] flex items-center justify-center text-slate-400 text-sm">Select a level to edit or click "Add New"</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeAdmin;