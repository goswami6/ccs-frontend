import { useState } from "react";
import { adminLogin } from "../../utils/api";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import { motion } from "framer-motion"; 
import { Lock, Mail, Loader2 } from "lucide-react"; 

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); // Hook initialize karein

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await adminLogin({ email, password });

      // Debugging: Isse check karein console mein ki token aa raha hai ya nahi
      console.log("API Response:", res);

      if (res && res.token) {
        // 1. Token store karein
        localStorage.setItem("admin_token", res.token);
        
        // 2. Redirect karein (useNavigate reload nahi karta, state maintain rakhta hai)
        navigate("/admin/dashboard");
        
        // Agar fir bhi issues aayein toh window.location fallback (Optional)
        // window.location.href = "/admin/dashboard";
      } else {
        setError("Login success, but token missing in response.");
      }
    } catch (err) {
      console.error("Login catch error:", err);
      const msg = err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 font-sans relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 p-10 border border-slate-100">
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#C62828] rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
              <Lock className="text-white" size={30} />
            </div>
          </div>

          <h1 className="text-3xl font-black text-center text-slate-900 mb-2 tracking-tight">
            Portal <span className="text-[#1E88E5]">Login</span>
          </h1>
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Crescent City School Admin
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                autoComplete="email" 
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-700"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-[#C62828] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 disabled:opacity-70 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Secure Access
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-50 flex justify-between items-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
              © {new Date().getFullYear()} Crescent City
            </p>
            <a href="/" className="text-[10px] font-bold text-blue-500 uppercase hover:underline">
              Back to Website
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
