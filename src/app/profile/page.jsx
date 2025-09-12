"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post("/api/users/me");
        setUser(res.data.data);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="h-screen flex items-center justify-center text-red-500">User not found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 Profile</h2>
        <p className="text-lg font-semibold">{user.username}</p>
        <p className="text-gray-600">{user.email}</p>

        {/* ✅ Link to full profile */}
        <Link
          href={`/profile/${user._id}`}
          className="mt-6 block bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
}
