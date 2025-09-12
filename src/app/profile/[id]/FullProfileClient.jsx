"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FullProfileClient({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading full profile...</div>;
  if (!user) return <div className="h-screen flex items-center justify-center text-red-500">User not found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">📄 Full Profile</h2>

        <p className="text-lg"><span className="font-semibold">Name:</span> {user.username}</p>
        <p className="text-lg"><span className="font-semibold">Email:</span> {user.email}</p>
        <p className="text-lg"><span className="font-semibold">Role:</span> {user.role || "User"}</p>
        <p className="text-sm text-gray-500 mt-4">User ID: {user._id}</p>
        <p className="text-sm text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
