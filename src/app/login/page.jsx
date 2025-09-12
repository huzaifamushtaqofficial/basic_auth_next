'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleLogin = async () => {
    // clear old messages
    setErrorMessage("")
    setSuccessMessage("")

    if (!user.email || !user.password) {
      setErrorMessage("⚠️ Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);

      // success
      setSuccessMessage("✅ Login successful! Redirecting...");
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (error) {
      console.log("Error in login:", error.message);

      if (error.response?.status === 401) {
        setErrorMessage("❌ Invalid email or password");
      } else {
        setErrorMessage(error.response?.data?.message || "❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          {loading ? 'Loading...' : 'Log In to Your Account'}
        </h2>

        {/* Error Message */}
        {errorMessage && (
          <p className="mb-4 text-red-600 font-medium text-center">{errorMessage}</p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="mb-4 text-green-600 font-medium text-center">{successMessage}</p>
        )}

        <div className="flex flex-col space-y-6">
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

          {/* Log In Button */}
          <button
            onClick={handleLogin}
            disabled={buttonDisabled || loading}
            className={`mt-4 w-full py-3 rounded-xl font-semibold text-lg transition-colors
              ${buttonDisabled || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-teal-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
