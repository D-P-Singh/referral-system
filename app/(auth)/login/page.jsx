"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ModernLoginPage() {
  const router = useRouter();
  const [formData, setFormData] =
    useState({
      phone: "",
      password: "",
    });
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log(formData);
    // API call here to register user with formData
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!data.success) {
      return
    }
    router.push("/dashboard")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl translate-x-20 translate-y-20"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-black leading-tight">
              Student Referral Platform
            </h1>

            <p className="mt-6 text-lg text-gray-200 leading-8 max-w-lg">
              Build your future with referrals, rewards, scholarships,
              courses, and student opportunities in one powerful dashboard.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-5 mt-10">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <h2 className="text-3xl font-bold">₹100+</h2>
              <p className="text-gray-200 mt-2">Earn on every successful referral</p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="text-gray-200 mt-2">Students already joined</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-black text-slate-900">
                Welcome Back 👋
              </h2>

              <p className="text-slate-500 mt-3 text-base leading-7">
                Login to access your dashboard, wallet balance,
                referrals and rewards.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-indigo-600 font-semibold hover:text-indigo-700"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                Login Now
              </button>
            </form>

            <div className="relative my-8">
              <div className="border-t border-slate-200"></div>

              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-slate-400">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="h-14 rounded-2xl border border-slate-200 font-semibold hover:bg-slate-50 transition-all">
                Google
              </button>

              <button className="h-14 rounded-2xl border border-slate-200 font-semibold hover:bg-slate-50 transition-all">
                OTP Login
              </button>
            </div>

            <p className="text-center text-slate-500 mt-10">
              Don’t have an account?

              <span onClick={() => { router.push("/register") }}  className="text-indigo-600 font-bold cursor-pointer ml-2">
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
