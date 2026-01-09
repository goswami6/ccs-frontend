import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 1. SIDEBAR (Fixed and handled inside) */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* 2. CONTENT AREA */}
      <div 
        className={`
          flex-1 flex flex-col min-w-0 transition-all duration-300
          ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"} 
          ml-0 
        `}
        
      >
        {/* HEADER - Fixed inside its container */}
        <AdminHeader
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* PAGE CONTENT */}
        <main className="pt-20 px-4 md:px-8 pb-10 max-w-[1600px] w-full mx-auto">
          {/* Outlet wraps the child routes */}
          <div className="animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}