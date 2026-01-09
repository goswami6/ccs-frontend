// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Login page me "admin_token" use ho raha hai, isliye yahan bhi wahi hoga
  const token = localStorage.getItem("admin_token"); 

  if (!token) {
    // Agar token nahi mila toh login par wapas bhej do
    return <Navigate to="/admin/login" replace />;
  }

  // Agar token mil gaya toh dashboard allow karo
  return <Outlet />;
}
