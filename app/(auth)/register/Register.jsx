"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const referralCode = searchParams?.get("ref");
    const [formData, setFormData] =
        useState({

            name: "",
            phone: "",
            email: "",
            password: "",
            referralCode:
                referralCode || "",
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

        //  console.log(formData);
        // API call here to register user with formData
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!data.success) {
            alert(data.message);
            return
        }
        alert(data.message)
        // console.log(data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Left Side */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-20 -translate-y-20"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl translate-x-20 translate-y-20"></div>

                    <div className="relative z-10">
                        <h1 className="text-5xl font-black leading-tight">
                            Join The Student Network
                        </h1>

                        <p className="mt-6 text-lg text-gray-200 leading-8 max-w-lg">
                            Register now and start earning rewards by inviting friends,
                            accessing scholarships, jobs, courses and exciting student benefits.
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-2 gap-5 mt-10">
                        <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                            <h2 className="text-3xl font-bold">₹100</h2>
                            <p className="text-gray-200 mt-2">Reward after every 2 referrals</p>
                        </div>

                        <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                            <h2 className="text-3xl font-bold">24/7</h2>
                            <p className="text-gray-200 mt-2">Student support and updates</p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="bg-white p-8 sm:p-12 flex flex-col justify-center">
                    <div className="w-full max-w-md mx-auto">
                        <div className="text-center lg:text-left">
                            <h2 className="text-4xl font-black text-slate-900">
                                Create Account 🚀
                            </h2>

                            <p className="text-slate-500 mt-3 text-base leading-7">
                                Start your referral journey and unlock rewards,
                                referrals and student opportunities.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 block mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700 block mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your  Phone Number"
                                    className="w-full h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700 block mb-2">
                                    Email Id
                                </label>

                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your  Email"
                                    className="w-full h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
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
                                    placeholder="Create password"
                                    className="w-full h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-700 block mb-2">
                                    Referral Code (Optional)
                                </label>

                                <input
                                    type="text"
                                    name="referralCode"
                                    value={formData.referralCode}
                                    onChange={handleChange}
                                    placeholder="Enter referral code"
                                    className="w-full h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800"
                                />
                            </div>


                            <button
                                type="submit"
                                className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-all duration-300"
                            >
                                Create Account
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
                                OTP Signup
                            </button>
                        </div>

                        <p className="text-center text-slate-500 mt-10">
                            Already have an account?

                            <span onClick={() => { router.push("/login") }} className="text-emerald-600 font-bold cursor-pointer ml-2">
                                Login Now
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
