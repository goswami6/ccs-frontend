import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopSocialBar from '../TopSocialBar';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 border-t-4 border-[#1E88E5]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: School Branding */}
          <div className="space-y-6">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="
      bg-white p-3 rounded-lg shadow-lg
      w-full sm:w-auto
      flex justify-center sm:justify-start
    ">
                <img
                  src="/footer-logo1.png"
                  alt="CCS Logo"
                  className="
          
        "
                />
              </div>
            </div>

            {/* TEXT */}
            <p className="text-gray-400 text-sm leading-relaxed italic text-center sm:text-left">
              "Committed to academic excellence, character development, and preparing students for tomorrow’s challenges."
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 justify-center sm:justify-start">
             <TopSocialBar />
            </div>
          </div>


          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold mb-6 border-l-4 border-[#1E88E5] pl-3 uppercase tracking-widest text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-[#1E88E5] flex items-center gap-2"><span>›</span> Home</Link></li>
              <li><Link to="/about" className="hover:text-[#1E88E5] flex items-center gap-2"><span>›</span> About Us</Link></li>
              <li><Link to="/academics" className="hover:text-[#1E88E5] flex items-center gap-2"><span>›</span> Academics</Link></li>
              <li><Link to="/gallery" className="hover:text-[#1E88E5] flex items-center gap-2"><span>›</span> Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-[#1E88E5] flex items-center gap-2"><span>›</span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Administration */}
          <div>
            <h4 className="text-sm font-bold mb-6 border-l-4 border-[#2E7D32] pl-3 uppercase tracking-widest text-white">Administration</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/admission" className="hover:text-[#2E7D32] flex items-center gap-2"><span>•</span> Admission Procedure</Link></li>
              <li><Link to="/fee" className="hover:text-[#2E7D32] flex items-center gap-2"><span>•</span> Fee Structure</Link></li>
              <li><Link to="/disclosure" className="hover:text-[#2E7D32] flex items-center gap-2"><span>•</span> Public Disclosure</Link></li>
              <li><Link to="/student/tc" className="hover:text-[#2E7D32] flex items-center gap-2"><span>•</span> Student TC</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact - Icons Fixed */}
          <div className="bg-slate-900  rounded-3xl">
            <h4 className="text-sm font-bold mb-8 border-l-4 border-[#C62828] pl-3 uppercase tracking-widest text-white">
              Get In Touch
            </h4>

            <ul className="space-y-6 text-gray-300 text-sm">

              {/* Address */}
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#C62828]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C62828] transition-colors duration-300">
                  <MapPin size={20} className="text-[#C62828] group-hover:text-white transition-colors" />
                </div>
                <span className="leading-relaxed">
                  Badagaon, Budhanpur <br />
                  Azamgarh, Uttar Pradesh
                </span>
              </li>

              {/* Phone Numbers */}
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#C62828]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C62828] transition-colors duration-300">
                  <Phone size={20} className="text-[#C62828] group-hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col gap-1">
                  <Link to="tel:+919569812336" className="hover:text-white transition-colors">+91 9569812336</Link>
                  <Link to="tel:+917309045674" className="hover:text-white transition-colors">+91 7309045674</Link>
                  <Link to="tel:+918795284282" className="hover:text-white transition-colors">+91 8795284282</Link>
                </div>
              </li>


            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
    pt-6 sm:pt-8
    border-t border-white/5
    flex flex-col md:flex-row
    justify-center md:justify-between
    items-center
    gap-3 sm:gap-4
    text-[9px] sm:text-[10px]
    font-bold
    text-gray-500
    uppercase
    tracking-[0.18em] sm:tracking-[0.2em]
    text-center md:text-left
  "
        >
          <p className="leading-relaxed">
            © 2025 Crescent City School. All Rights Reserved.
          </p>

         
        </div>


      </div>
    </footer>
  );
};

export default Footer;



