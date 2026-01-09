import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Award, FileText, Megaphone, ArrowRight, Download, X, Clock, Loader2 } from 'lucide-react';
import { fetchNews, API_BASE_URL } from "../../utils/api";

const NewsUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await fetchNews();
      setUpdates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (cat) => {
    switch (cat) {
      case 'Circular': return <FileText className="text-blue-500" />;
      case 'Announcement': return <Megaphone className="text-orange-500" />;
      case 'Exam': return <Calendar className="text-purple-500" />;
      case 'Holiday': return <Bell className="text-red-500" />;
      case 'Achievement': return <Award className="text-yellow-500" />;
      default: return <Bell className="text-gray-500" />;
    }
  };

  const filters = ['All', 'Circular', 'Announcement', 'Exam', 'Holiday', 'Achievement'];
  const filteredUpdates = activeFilter === 'All' ? updates : updates.filter(u => u.category === activeFilter);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - Remains same as your static code */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[#1E88E5] font-black uppercase tracking-[0.3em] text-xs">Stay Informed</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">News & <span className="text-[#C62828]">Updates</span></h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeFilter === f ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400'}`}>
                {f}s
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredUpdates.map((item) => (
            <div key={item._id} className={`group bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border border-slate-100 hover:border-[#1E88E5] transition-all duration-300 hover:shadow-xl ${item.urgent ? 'border-l-8 border-l-orange-500' : ''}`}>
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                {getIcon(item.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.date}</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{item.category}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.description}</p>
              </div>
              <button onClick={() => setSelectedUpdate(item)} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center gap-2">
                View Details <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Modal Logic with File Link */}
        {selectedUpdate && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setSelectedUpdate(null)}></div>
            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl">
              <h2 className="text-2xl font-black mb-4">{selectedUpdate.title}</h2>
              <p className="text-slate-600 mb-8">{selectedUpdate.fullContent}</p>
              
              {selectedUpdate.fileUrl && (
                <a 
                  href={`${API_BASE_URL.replace('/api', '')}${selectedUpdate.fileUrl}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1E88E5] text-white py-4 rounded-2xl font-bold w-full"
                >
                  <Download size={18} /> Download Attachment
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsUpdates;