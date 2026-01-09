// src/admin/layout/AdminHeader.jsx
import { Menu, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <header
      className={`
        fixed top-0 right-0 h-16 z-40
        bg-white border-b shadow-sm
        flex items-center
        transition-all duration-300
        ${sidebarOpen ? "lg:w-[calc(100%-16rem)]" : "lg:w-[calc(100%-5rem)]"}
        w-full
      `}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center px-4 md:px-6">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center gap-4 px-4 md:px-6">
        {/* USER ICON */}
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
          <User size={18} className="text-blue-600" />
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-1 text-red-600 hover:text-red-700"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
