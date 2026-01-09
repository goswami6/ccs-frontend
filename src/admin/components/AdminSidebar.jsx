import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  CheckCircle2, 
  Settings, 
  ShieldCheck, 
  Newspaper, 
  CreditCard ,
  ChevronLeft,
  GraduationCap,
  ChevronDown,
  PenTool,
  LogOut
} from 'lucide-react';
import { useState } from "react";

export default function AdminSidebar({ open, setOpen }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // State for Accordion
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);

  /* ================= MENUS ================= */
  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, link: "/admin" },
    { name: "Enquiries", icon: <FileText size={18} />, link: "/admin/inquiries" },
    { name: "Add Banner", icon: <ImageIcon size={18} />, link: "/admin/heroslider" },
    { name: "Activity", icon: <Users size={18} />, link: "/admin/activity" },
    { name: "Why Choose Us", icon: <CheckCircle2 size={18} />, link: "/admin/why-choose-us" },
    { name: "About Us", icon: <Settings size={18} />, link: "/admin/about" },
    { name: "Public Disclosure", icon: <ShieldCheck size={18} />, link: "/admin/public-disclosure" },
    { name: "ADD NEWS", icon: <Newspaper size={18} />, link: "/admin/news" },
    { name: "ADD Fee", icon: <CreditCard size={18} />, link: "/admin/fee" },
    { name: "Gallery", icon: <CreditCard size={18} />, link: "/admin/gallery" },
    { name: "Add TC", icon: <CreditCard size={18} />, link: "/admin/student-tc" },
  ];

  const academicsData = [
    { name: "Academic Details", link: "/admin/details" },
    { name: "Admission Process", link: "/admin/admission" },
    { name: "School Facilities", link: "/admin/facilities" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const activeClass = "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200";
  const inactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-blue-600";

  return (
    <nav>
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen z-[70] bg-white border-r shadow-xl
        transition-all duration-300 ${open ? "w-64" : "w-0 lg:w-20"} flex flex-col`}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <h2 className={`font-black text-blue-600 ${open ? "block" : "hidden lg:block"}`}>
            {open ? "CCS School" : "CCS"}
          </h2>

          <button onClick={() => setOpen(!open)} className="p-2 rounded-xl hover:bg-gray-100">
            <ChevronLeft size={20} className={!open ? "rotate-180" : ""} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 mt-4 space-y-1 px-3 overflow-y-auto custom-scrollbar">

          {/* MAIN MENU */}
          {menu.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1
              ${pathname === item.link ? activeClass : inactiveClass}`}
            >
              {item.icon}
              {open && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          ))}

          {/* ACADEMICS ACCORDION */}
          <div className="py-1">
            <button
              onClick={() => {
                if (!open) setOpen(true);
                setIsAcademicsOpen(!isAcademicsOpen);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all
              ${pathname.includes("academics") || pathname.includes("admission") || pathname.includes("facilities")
                  ? "text-blue-600 bg-blue-50/50"
                  : "text-gray-600 hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap size={18} />
                {open && <span className="text-sm font-medium">Academics</span>}
              </div>
              {open && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isAcademicsOpen ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {/* DROPDOWN ITEMS (Accordion Style) */}
            <div className={`overflow-hidden transition-all duration-300 ${isAcademicsOpen && open ? "max-h-96 mt-1" : "max-h-0"}`}>
              {academicsData.map((subItem, idx) => (
                <Link
                  key={idx}
                  to={subItem.link}
                  className={`flex items-center gap-3 pl-11 pr-4 py-2 text-xs rounded-lg transition-all mb-1
                  ${pathname === subItem.link ? "text-blue-600 font-bold bg-blue-50" : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"}`}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-gray-100 my-2 mx-4" />

          {/* BLOG */}
          <Link
            to="/admin/add-blog"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
            ${pathname === "/admin/add-blog" ? activeClass : inactiveClass}`}
          >
            <PenTool size={18} />
            {open && <span className="text-sm font-medium">Add Blog</span>}
          </Link>

          {/* SETTINGS */}
          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
            ${pathname === "/admin/settings" ? activeClass : inactiveClass}`}
          >
            <Settings size={18} />
            {open && <span className="text-sm font-medium">Settings</span>}
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            {open && <span className="font-bold text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </nav>
  );
}