"use client";
import Link from "next/link";
import { Lock, User, Key } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500 flex flex-col justify-between overflow-hidden">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 relative z-10">
        <h1 className="text-6xl font-extrabold text-white mb-4 animate-fadeIn">
          AuthApp
        </h1>
        <p className="text-xl text-white/80 mb-8 animate-fadeIn delay-200">
          Modern, Minimal & Secure Landing Page
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link href="/login">
            <button className="flex items-center gap-3 cursor-pointer px-8 py-4 rounded-lg bg-white text-purple-600 font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300">
              <Lock className="w-6 h-6" />
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="flex items-center gap-3 cursor-pointer px-8 py-4 rounded-lg bg-white text-purple-600 font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300">
              <User className="w-6 h-6" />
              Sign Up
            </button>
          </Link>
        </div>
      </section>

      {/* Floating Animated Icons */}
      <Lock className="absolute top-10 left-20 w-12 h-12 text-white/20 animate-bounce-slow" />
      <User className="absolute top-1/2 right-10 w-14 h-14 text-white/15 animate-spin-slow" />
      <Key className="absolute bottom-20 left-1/3 w-10 h-10 text-white/20 animate-bounce-slow delay-500" />

      {/* Footer */}
      <footer className="text-center py-4 text-white/70 text-sm z-10">
        Developed by Huzaifa Mushtaq
      </footer>

      {/* Background Blur Circles */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-3xl filter blur-3xl animate-pulse delay-300"></div>

      {/* Tailwind Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }
        .animate-bounce-slow { animation: bounce 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
      `}</style>
    </div>
  );
}
