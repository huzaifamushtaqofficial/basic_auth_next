"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verifyUserEmail = async (tok) => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token: tok });
      console.log("✅ Email verification success:", response.data);
      toast.success("Email verified successfully");
      setVerified(true);
    } catch (err) {
      console.error("❌ Error in email verification:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Email verification failed");
      setError(true);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token"); // email link should be like ?token=abcd123

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      verifyUserEmail(tokenFromUrl);
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (verified) {
      setTimeout(() => {
        router.push("/login");
      }, 1500); // thora delay tak user ko success msg dikhe
    }
  }, [verified, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md sm:max-w-lg md:max-w-xl text-center">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800">Email Verification</h2>
        {verified ? (
          <p className="text-green-600 text-lg">Your email has been successfully verified!</p>
        ) : error ? (
          <p className="text-red-600 text-lg">There was an error verifying your email. Please try again.</p>
        ) : (
          <p className="text-gray-600 text-lg">Verifying your email, please wait...</p>
        )}
      </div>
    </div>
  );
}
