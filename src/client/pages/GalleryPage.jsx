import React, { useState } from 'react';
import ImageGallery from '../components/ImageGallery';
import { Image as ImageIcon, Video } from 'lucide-react';

const GalleryPage = () => {
  const [activeType, setActiveType] = useState('image'); // 'image' or 'video'
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Events', 'Sports', 'Campus', 'Academic', 'Creative'];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      
      {/* Hero Header */}
      <div className="bg-[#1E88E5] py-20 text-center text-white relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Our <span className="text-[#C62828]">Gallery</span>
        </h1>
        <p className="max-w-xl mx-auto text-blue-100 text-lg px-4">
          A visual journey through the vibrant life at Crescent City School.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl shadow-inner border border-slate-200">
            <button
              onClick={() => setActiveType('image')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeType === 'image' ? 'bg-white text-[#1E88E5] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <ImageIcon size={20} /> Photos
            </button>
            <button
              onClick={() => setActiveType('video')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeType === 'video' ? 'bg-white text-[#1E88E5] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Video size={20} /> Videos
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Content */}
        <div className="min-h-[400px]">
           <ImageGallery typeFilter={activeType} categoryFilter={selectedCategory} />
        </div>

      </div>
    </div>
  );
};

export default GalleryPage;