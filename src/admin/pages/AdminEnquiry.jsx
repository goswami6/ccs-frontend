import React, { useEffect, useState } from 'react';
import { fetchEnquiries, deleteEnquiry, updateEnquiryStatus } from '../../utils/api';
import { Mail, Phone, Calendar, Trash2, MessageSquare, RefreshCcw, Loader2, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx'; // Import Excel library

const AdminEnquiry = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchEnquiries();
      setList(res.data || []);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Excel Download Function
  const downloadExcel = () => {
    if (list.length === 0) return alert("No data to download");

    // Data formatting for Excel
    const excelData = list.map((item, index) => ({
      "S.No": index + 1,
      "Student Name": item.name,
      "Email": item.email,
      "Phone": item.phone,
      "Subject": item.subject,
      "Message": item.message,
      "Status": item.status?.toUpperCase() || "PENDING",
      "Date": new Date(item.createdAt).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

    // Generate and Download file
    XLSX.writeFile(workbook, `Enquiries_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      setList(list.map(item => item._id === id ? { ...item, status: newStatus } : item));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      await deleteEnquiry(id);
      setList(list.filter(item => item._id !== id));
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'contacted': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto font-sans min-h-screen bg-slate-50">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Admission <span className="text-blue-600">Enquiries</span>
          </h1>
          <p className="text-slate-500 font-medium">Manage and export student inquiries</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
            {/* EXCEL BUTTON */}
            <button 
              onClick={downloadExcel}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
            >
              <FileSpreadsheet size={18} />
              EXPORT EXCEL
            </button>

            <button onClick={load} className="p-2.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                <RefreshCcw size={18} className="text-slate-600" />
            </button>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 bg-slate-200 px-2 py-1 rounded">
              Total: {list.length}
            </span>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
           <MessageSquare className="mx-auto text-slate-200 mb-4" size={64} />
           <p className="text-slate-400 font-bold uppercase tracking-widest">No enquiries found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {list.map((item) => (
            <div key={item._id} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-800">{item.name}</h3>
                    <p className="text-blue-600 font-bold text-sm tracking-tight">{item.subject}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select 
                    value={item.status || 'new'} 
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border outline-none cursor-pointer transition-all ${getStatusStyle(item.status)}`}
                  >
                    <option value="new">🔴 Pending</option>
                    <option value="contacted">🔵 Contacted</option>
                    <option value="resolved">🟢 Resolved</option>
                  </select>

                  <button 
                    onClick={() => handleDelete(item._id)} 
                    className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <a href={`mailto:${item.email}`} className="flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                  <Mail size={18} className="text-slate-300" /> {item.email}
                </a>
                <a href={`tel:${item.phone}`} className="flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                  <Phone size={18} className="text-slate-300" /> {item.phone}
                </a>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                  <Calendar size={18} className="text-slate-300" /> {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl flex gap-4 border border-slate-100">
                <MessageSquare className="text-blue-600 shrink-0 mt-1" size={18} />
                <p className="text-slate-600 font-medium text-sm leading-relaxed italic">
                  "{item.message}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Internal Helper for User Icon
const User = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default AdminEnquiry;