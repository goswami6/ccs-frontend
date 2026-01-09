import React from 'react';
import { Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopSocialBar from '../TopSocialBar';

const TopBar = () => {
  return (
    <div className="bg-[#0f172a] text-white py-2 px-4 md:px-8 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-medium">
        
        {/* LEFT SIDE: CONTACT INFO */}
        <div className="flex items-center gap-4">
          <a href="tel:+11234567890" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
            <Phone size={14} className="text-white shrink-0" />
            <span className="text-[11px] md:text-sm whitespace-nowrap text-white">+91 7309045674</span>
          </a>
        </div>

        {/* RIGHT SIDE: SOCIAL & CTA */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Hidden on Mobile & Tablet (Social Icons) */}
         <TopSocialBar />

          {/* CTA BUTTON - Always visible */}
          <Link 
            to="/fee" 
            className="bg-[#C62828] text-white px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold tracking-wider shadow-lg hover:bg-red-700 transition-all active:scale-95 uppercase whitespace-nowrap"
          >
            Fee Structure
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TopBar;