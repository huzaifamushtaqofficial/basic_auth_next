'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success", response.data);
      toast.success("Signup Successful");
      router.push('/login');
    } catch (error) {
      console.log("Error in signup:", error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          {loading ? 'Loading...' : 'Create an Account'}
        </h2>

        <div className="flex flex-col space-y-6">
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2 font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Your username"
              className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="you@example.com"
              className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            disabled={buttonDisabled || loading}
            className={`mt-4 w-full py-3 rounded-xl font-semibold text-lg transition-colors
              ${buttonDisabled || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-500 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
