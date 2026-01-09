import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile Accordion States
  const [mobileAcademics, setMobileAcademics] = useState(false);
  const [mobileStudent, setMobileStudent] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Shared Tailwind Classes
  const navLinkClass = "text-[13px] font-bold text-slate-700 hover:text-[#1E88E5] transition-colors tracking-wide px-2 py-1 uppercase";
  const dropdownItemClass = "block px-6 py-3 text-[13px] font-semibold text-slate-600 hover:bg-blue-50 hover:text-[#1E88E5] transition-all";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-[100] shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">

          {/* 1. LOGO SECTION */}
          <div className="flex-shrink-0 relative z-[110]">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/logo.jpg" alt="Logo" className="h-12 md:h-14 w-auto transition-transform group-hover:scale-105" />
            </Link>
          </div>

          {/* 2. DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-x-4 xl:gap-x-6">
            <Link to="/" className={navLinkClass}>HOME</Link>
            <Link to="/about" className={navLinkClass}>ABOUT</Link>

            {/* Academics Dropdown */}
            <div className="relative"
              onMouseEnter={() => setIsAcademicsOpen(true)}
              onMouseLeave={() => setIsAcademicsOpen(false)}>
              <button className={`${navLinkClass} flex items-center gap-1`}>
                Academics <ChevronDown size={14} className={`transition-transform ${isAcademicsOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-b-xl py-2 transition-all duration-300 ${isAcademicsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <Link to="/academics/details" className={dropdownItemClass}>Academic Details</Link>
                <Link to="/admission" className={dropdownItemClass}>Admission</Link>
                <Link to="/facilities" className={dropdownItemClass}>Facilities</Link>
              </div>
            </div>

            <Link to="/activities" className={navLinkClass}>ACTIVITIES</Link>
            <Link to="/gallery" className={navLinkClass}>GALLERY</Link>
            <Link to="/news" className={navLinkClass}>NEWS & UPDATES</Link>

            {/* Student Dropdown */}
            <div className="relative"
              onMouseEnter={() => setIsStudentOpen(true)}
              onMouseLeave={() => setIsStudentOpen(false)}>
              <button className={`${navLinkClass} flex items-center gap-1`}>
                Student <ChevronDown size={14} className={`transition-transform ${isStudentOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 w-52 bg-white border border-gray-100 shadow-xl rounded-b-xl py-2 transition-all duration-300 ${isStudentOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <Link to="/student/tc" className={dropdownItemClass}>Student TC</Link>

              </div>
            </div>

            <Link to="/contact" className={navLinkClass}>CONTACT</Link>
          </div>

          {/* 3. RIGHT SECTION & MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-5 border-l border-gray-200 ml-4 pl-6">
              <Link to="/disclosure" className="text-[11px] font-black text-slate-800 hover:text-[#C62828] transition-colors uppercase tracking-widest text-right">
                Public Disclosure
              </Link>
            </div>

            {/* Toggle Button - Placed at high Z-index to be seen over overlay */}
            <button
              className="lg:hidden relative z-[110] p-2 rounded-xl bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE MENU OVERLAY */}
      <div className={`lg:hidden fixed inset-0 z-[105] bg-white transition-transform duration-500 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full overflow-y-auto pt-24 pb-10 px-6">

          <nav className="flex flex-col space-y-1">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-lg font-bold border-b border-gray-50 text-slate-800 hover:text-[#1E88E5]">HOME</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-lg font-bold border-b border-gray-50 text-slate-800 hover:text-[#1E88E5]">ABOUT</Link>

            {/* Mobile Academics Accordion */}
            <div className="border-b border-gray-50">
              <button
                onClick={() => setMobileAcademics(!mobileAcademics)}
                className="w-full flex justify-between items-center py-4 text-lg font-bold text-slate-800"
              >
                ACADEMICS <ChevronDown size={20} className={`transition-transform duration-300 ${mobileAcademics ? 'rotate-180' : ''}`} />
              </button>
              <div className={`bg-slate-50 transition-all duration-300 ease-in-out overflow-hidden ${mobileAcademics ? 'max-h-60' : 'max-h-0'}`}>
                <Link to="/academics/details" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 px-6 text-slate-600 font-semibold border-b border-white hover:text-[#1E88E5]">Academic Details</Link>
                <Link to="/admission" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 px-6 text-slate-600 font-semibold border-b border-white hover:text-[#1E88E5]">Admission</Link>
                <Link to="/facilities" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 px-6 text-slate-600 font-semibold hover:text-[#1E88E5]">Facilities</Link>
              </div>
            </div>

            <Link to="/activities" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-lg font-bold border-b border-gray-50 text-slate-800 hover:text-[#1E88E5]">ACTIVITIES</Link>
            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-lg font-bold border-b border-gray-50 text-slate-800 hover:text-[#1E88E5]">GALLERY</Link>

            {/* Mobile Student Accordion */}
            <div className="border-b border-gray-50">
              <button
                onClick={() => setMobileStudent(!mobileStudent)}
                className="w-full flex justify-between items-center py-4 text-lg font-bold text-slate-800"
              >
                STUDENT <ChevronDown size={20} className={`transition-transform duration-300 ${mobileStudent ? 'rotate-180' : ''}`} />
              </button>
              <div className={`bg-slate-50 transition-all duration-300 ease-in-out overflow-hidden ${mobileStudent ? 'max-h-40' : 'max-h-0'}`}>
                <Link to="/student/tc" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 px-6 text-slate-600 font-semibold border-b border-white hover:text-[#1E88E5]">Student TC</Link>
                <Link to="/student/result" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 px-6 text-slate-600 font-semibold hover:text-[#1E88E5]">Results</Link>
              </div>
            </div>

            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-lg font-bold text-slate-800 hover:text-[#1E88E5]">CONTACT</Link>
          </nav>

          <div className="mt-8">
            <Link
              to="/disclosure"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center bg-[#C62828] text-white py-4 rounded-2xl font-bold tracking-widest shadow-lg shadow-red-200 hover:bg-red-700 transition-all active:scale-95"
            >
              PUBLIC DISCLOSURE
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;