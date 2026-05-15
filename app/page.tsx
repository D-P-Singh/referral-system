"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">

      {/* background blur circles */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-black/10 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* main card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-[90%] max-w-md text-center text-white">

        <h1 className="text-4xl font-bold mb-3">
          Welcome to DevApp 🚀
        </h1>

        <p className="text-white/80 mb-8 text-sm leading-relaxed">
          Manage your account, track activity, and explore features in one powerful dashboard.
        </p>

        <div className="flex flex-col gap-4">
          
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition duration-300 shadow-lg"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="w-full py-3 rounded-xl border border-white/40 hover:bg-white/10 transition duration-300"
          >
            Create Account
          </button>
        </div>

        <p className="text-xs text-white/60 mt-6">
          Secure • Fast • Modern Dashboard System
        </p>
      </div>
    </div>
  );
}