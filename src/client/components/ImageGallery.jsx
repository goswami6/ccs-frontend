import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, PlayCircle } from 'lucide-react';
import { fetchGalleryItems, API_BASE_URL } from '../../utils/api';

const ImageGallery = ({ typeFilter, categoryFilter }) => {
  const [allMedia, setAllMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchGalleryItems();
        setAllMedia(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Gallery loading error:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const filteredData = allMedia.filter((item) => {
    const matchesType = item.type === typeFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesType && matchesCategory;
  });

  const getFullUrl = (path) => {
    if (!path) return "";
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const filePath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${filePath}`;
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % filteredData.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? filteredData.length - 1 : prev - 1));
  };

  if (loading) return <div className="text-center py-20 animate-pulse text-slate-400 font-bold">Loading Gallery...</div>;

  return (
    <div className="w-full">
      {filteredData.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredData.map((item, index) => (
            <div
              key={item._id || index}
              className="relative break-inside-avoid overflow-hidden rounded-3xl cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-500 bg-slate-100 border border-slate-200"
              onClick={() => openLightbox(index)}
            >
              {item.type === 'video' ? (
                <div className="relative">
                  <video src={getFullUrl(item.fileUrl)} className="w-full rounded-3xl" muted />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <PlayCircle size={48} className="text-white opacity-80" />
                  </div>
                </div>
              ) : (
                <img
                  src={getFullUrl(item.fileUrl)}
                  alt={item.title}
                  className="w-full object-cover rounded-3xl transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found'; }}
                />
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex flex-col justify-end p-6">
                <span className="text-white/70 text-xs uppercase font-bold">{item.category}</span>
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                  {item.title} <Maximize2 size={16} className="text-blue-400" />
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
          No {typeFilter}s found in {categoryFilter} category.
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && filteredData[currentIndex] && (
        <div className="fixed inset-0 z-[999] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-6 right-6 p-3 text-white hover:bg-white/10 rounded-full" onClick={closeLightbox}>
            <X size={30} />
          </button>
          <button className="absolute left-4 p-4 text-white hover:bg-white/10 rounded-full" onClick={showPrev}>
            <ChevronLeft size={40} />
          </button>
          <button className="absolute right-4 p-4 text-white hover:bg-white/10 rounded-full" onClick={showNext}>
            <ChevronRight size={40} />
          </button>
          <div className="max-w-5xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            {filteredData[currentIndex].type === 'video' ? (
              <video src={getFullUrl(filteredData[currentIndex].fileUrl)} controls autoPlay className="max-h-[75vh] w-full rounded-2xl shadow-2xl" />
            ) : (
              <img src={getFullUrl(filteredData[currentIndex].fileUrl)} className="max-h-[75vh] object-contain rounded-2xl shadow-2xl" alt="" />
            )}
            <div className="mt-6 text-center">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs uppercase font-bold">{filteredData[currentIndex].category}</span>
              <h2 className="text-white text-2xl font-bold mt-2">{filteredData[currentIndex].title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;