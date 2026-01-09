// client/components/Gallery/VideoGallery.jsx
import React, { useState } from 'react';
import { PlayCircle, X } from 'lucide-react'; // Icons for video player

const videosData = [
  { id: 1, thumbnail: '/images/gallery/video-thumb1.jpg', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'School Annual Day Highlights' },
  { id: 2, thumbnail: '/images/gallery/video-thumb2.jpg', src: 'https://www.youtube.com/embed/M7lc1UVf-VE', title: 'Science Exhibition 2023' },
  { id: 3, thumbnail: '/images/gallery/video-thumb3.jpg', src: 'https://www.youtube.com/embed/yF-G5uGz_l8', title: 'Sports Day Fun' },
  { id: 4, thumbnail: '/images/gallery/video-thumb4.jpg', src: 'https://www.youtube.com/embed/y6120QO principal-message', title: 'Principal\'s Inspirational Message' },
  // Add more videos as needed
];

const VideoGallery = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  const openVideoModal = (src, title) => {
    setCurrentVideoSrc(src);
    setCurrentVideoTitle(title);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setCurrentVideoSrc('');
    setCurrentVideoTitle('');
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videosData.map((video) => (
          <div
            key={video.id}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
            onClick={() => openVideoModal(video.src, video.title)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircle className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-200" />
            </div>
            <p className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-70 text-white text-sm truncate">{video.title}</p>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeVideoModal}
          >
            <X className="w-8 h-8" />
          </button>
          <h3 className="text-white text-xl md:text-2xl font-semibold mb-6 text-center">{currentVideoTitle}</h3>
          <div className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <iframe
              src={`${currentVideoSrc}?autoplay=1`} // Autoplay on open
              title={currentVideoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGallery;