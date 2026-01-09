import { useState } from "react";
import { adminLogin } from "../../utils/api";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await adminLogin({ email, password });

      console.log("LOGIN RESPONSE 👉", res.data);

      // ✅ IMPORTANT CHECK
      if (res.data?.token) {
        localStorage.setItem("admin_token", res.data.token);
        navigate("/admin/dashboard");
      } else {
        setError("Token not received from server");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2rem] shadow-xl p-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#C62828] rounded-2xl flex items-center justify-center">
              <Lock className="text-white" size={30} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6">
            Admin Login
          </h1>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                name="email"
                id="admin-email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-slate-50 rounded-2xl px-12 py-4 text-sm outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                name="password"
                id="admin-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-slate-50 rounded-2xl px-12 py-4 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
