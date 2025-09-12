"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Mail, CheckCircle, XCircle, LogOut } from "lucide-react";

export default function FullProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${id}`);
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const logout = async () => {
    await axios.post("/api/users/logout");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 font-semibold text-lg">
        ❌ User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md text-center border border-white/20"
      >
        {/* Profile Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.username?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Name + Email */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
          <User className="w-6 h-6 text-indigo-500" /> {user.username}
        </h2>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <Mail className="w-5 h-5 text-gray-500" /> {user.email}
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300/40"></div>

        {/* User Details */}
        <div className="text-left space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">User ID:</span> {user._id}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <span className="font-semibold">Verified:</span>
            {user.isVerified ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </p>
        </div>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="mt-8 w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold"
        >
          <LogOut className="w-5 h-5" /> Logout
        </motion.button>
      </motion.div>
    </div>
  );
}
