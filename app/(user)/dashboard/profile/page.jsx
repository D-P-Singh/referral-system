"use client";

import { useEffect, useState } from "react";
import {
    FaCamera,
    FaEnvelope,
    FaPhone,
    FaUserGraduate,
    FaUniversity,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaEdit,
    FaShieldAlt,
} from "react-icons/fa";

export default function ProfilePage() {
 
    const[user, setUser] = useState({});
    useEffect(() => {
        fetch("/api/user/profile")
            .then((res) => res.json())
            .then((data) => {
                setUser(data.user);
            });
    }, []);
// const user = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+1 234 567 890",
//     college: "ABC University",
//     course: "Computer Science",
//     profileImage: "/images/profile.jpg"
// };
    return (

        <div className="space-y-8">

            {/* Top Banner */}

            <div
                className="
          relative overflow-hidden
          rounded-[32px]
          bg-gradient-to-r
          from-indigo-600
          via-violet-600
          to-purple-600
          p-8 lg:p-10
          text-white
          shadow-2xl
        "
            >

                <div
                    className="
            absolute top-0 right-0
            w-96 h-96
            bg-white/10 rounded-full
            blur-3xl
          "
                />

                <div
                    className="
            relative z-10
            flex flex-col lg:flex-row
            items-start lg:items-center
            justify-between gap-8
          "
                >

                    {/* Profile Left */}

                    <div className="flex items-center gap-6">

                        <div className="relative">

                            <img
                                src={user?.profileImage}
                                alt="profile"
                                className="
                  w-32 h-32
                  rounded-[30px]
                  object-cover
                  border-4 border-white/20
                  shadow-2xl
                "
                            />

                            <button
                                className="
                  absolute bottom-2 right-2
                  w-11 h-11
                  rounded-2xl
                  bg-white text-indigo-600
                  flex items-center justify-center
                  shadow-lg
                "
                            >

                                <FaCamera />

                            </button>

                        </div>

                        <div>

                            <div className="flex items-center gap-3 flex-wrap">

                                <h1 className="text-4xl font-black">
                                    {user?.name}
                                </h1>

                                {
                                    user?.isVerified && (

                                        <div
                                            className="
                        px-4 py-2
                        rounded-2xl
                        bg-emerald-400/20
                        border border-emerald-300/30
                        text-sm font-bold
                        flex items-center gap-2
                      "
                                        >

                                            <FaShieldAlt />

                                            Verified

                                        </div>
                                    )
                                }

                            </div>

                            <p className="mt-3 text-indigo-100 text-lg">
                                Student Member
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">

                                <div
                                    className="
                    px-5 py-3 rounded-2xl
                    bg-white/10 backdrop-blur-md
                    border border-white/10
                    text-sm font-semibold
                  "
                                >
                                    Referral Code:
                                    {" "}
                                    {user?.referralCode}
                                </div>

                                <div
                                    className="
                    px-5 py-3 rounded-2xl
                    bg-white/10 backdrop-blur-md
                    border border-white/10
                    text-sm font-semibold
                  "
                                >
                                    Wallet:
                                    {" "}
                                    ₹
                                    {user?.walletBalance}
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Edit Button */}

                    <button
                        className="
              h-14 px-7
              rounded-2xl
              bg-white text-indigo-700
              font-bold
              flex items-center gap-3
              hover:scale-105
              transition-all duration-300
              shadow-xl
            "
                    >

                        <FaEdit />

                        Edit Profile

                    </button>

                </div>

            </div>

            {/* Stats */}

            {/* <div
                className="
          grid
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
            >

                <div
                    className="
            bg-white rounded-3xl
            p-6 shadow-lg
            border border-slate-100
          "
                >

                    <p className="text-slate-500 text-sm">
                        Total Earned
                    </p>

                    <h2 className="text-3xl font-black mt-3">
                        ₹
                        {user.totalEarned}
                    </h2>

                </div>

                <div
                    className="
            bg-white rounded-3xl
            p-6 shadow-lg
            border border-slate-100
          "
                >

                    <p className="text-slate-500 text-sm">
                        Referrals
                    </p>

                    <h2 className="text-3xl font-black mt-3">
                        {
                            user.successfulReferrals
                        }
                    </h2>

                </div>

                <div
                    className="
            bg-white rounded-3xl
            p-6 shadow-lg
            border border-slate-100
          "
                >

                    <p className="text-slate-500 text-sm">
                        Wallet Balance
                    </p>

                    <h2 className="text-3xl font-black mt-3">
                        ₹
                        {user.walletBalance}
                    </h2>

                </div>

                <div
                    className="
            bg-white rounded-3xl
            p-6 shadow-lg
            border border-slate-100
          "
                >

                    <p className="text-slate-500 text-sm">
                        Joined
                    </p>

                    <h2 className="text-2xl font-black mt-3">
                        {user.joinedAt}
                    </h2>

                </div>

            </div> */}

            {/* Profile Details */}

            <div
                className="
          grid lg:grid-cols-3 gap-6
        "
            >

                {/* Left Info */}

                <div
                    className="
            lg:col-span-2
            bg-white rounded-3xl
            p-8 shadow-lg
            border border-slate-100
          "
                >

                    <div className="flex items-center justify-between">

                        <h2 className="text-2xl font-black text-slate-900">
                            Personal Information
                        </h2>

                        <button
                            className="
                text-indigo-600
                font-bold
              "
                        >
                            Edit
                        </button>

                    </div>

                    <div
                        className="
              mt-8
              grid md:grid-cols-2
              gap-6
            "
                    >

                        {/* Email */}

                        <div
                            className="
                bg-slate-50
                rounded-2xl
                p-5
              "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                    w-12 h-12
                    rounded-2xl
                    bg-indigo-100
                    flex items-center justify-center
                    text-indigo-600
                  "
                                >

                                    <FaEnvelope />

                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Email Address
                                    </p>

                                    <h3 className="font-bold text-slate-900 mt-1">
                                        {user?.email}
                                    </h3>

                                </div>

                            </div>

                        </div>

                        {/* Phone */}

                        <div
                            className="
                bg-slate-50
                rounded-2xl
                p-5
              "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                    w-12 h-12
                    rounded-2xl
                    bg-emerald-100
                    flex items-center justify-center
                    text-emerald-600
                  "
                                >

                                    <FaPhone />

                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Phone Number
                                    </p>

                                    <h3 className="font-bold text-slate-900 mt-1">
                                        {user?.phone}
                                    </h3>

                                </div>

                            </div>

                        </div>

                        {/* College */}

                        <div
                            className="
                bg-slate-50
                rounded-2xl
                p-5
              "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                    w-12 h-12
                    rounded-2xl
                    bg-violet-100
                    flex items-center justify-center
                    text-violet-600
                  "
                                >

                                    <FaUniversity />

                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        College
                                    </p>

                                    <h3 className="font-bold text-slate-900 mt-1">
                                        {user?.college}
                                    </h3>

                                </div>

                            </div>

                        </div>

                        {/* Course */}

                        <div
                            className="
                bg-slate-50
                rounded-2xl
                p-5
              "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                    w-12 h-12
                    rounded-2xl
                    bg-pink-100
                    flex items-center justify-center
                    text-pink-600
                  "
                                >

                                    <FaUserGraduate />

                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Course
                                    </p>

                                    <h3 className="font-bold text-slate-900 mt-1">
                                        {user?.course}
                                    </h3>

                                </div>

                            </div>

                        </div>

                        {/* Location */}

                        <div
                            className="
                bg-slate-50
                rounded-2xl
                p-5
              "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                    w-12 h-12
                    rounded-2xl
                    bg-orange-100
                    flex items-center justify-center
                    text-orange-600
                  "
                                >

                                    <FaMapMarkerAlt />

                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Location
                                    </p>

                                    <h3 className="font-bold text-slate-900 mt-1">
                                        {user?.city}
                                    </h3>

                                </div>

                            </div>

                        </div>

                        {/* Joined */}

                        <div
                            className="
                bg-slate-50
                rounded-2xl
                p-5
              "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                    w-12 h-12
                    rounded-2xl
                    bg-cyan-100
                    flex items-center justify-center
                    text-cyan-600
                  "
                                >

                                    <FaCalendarAlt />

                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        Joined At
                                    </p>

                                    <h3 className="font-bold text-slate-900 mt-1">
                                        {user?.joinedAt}
                                    </h3>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div
                    className="
            bg-white rounded-3xl
            p-8 shadow-lg
            border border-slate-100
          "
                >

                    <h2 className="text-2xl font-black text-slate-900">
                        Account Status
                    </h2>

                    <div className="mt-8 space-y-5">

                        <div
                            className="
                bg-emerald-50
                border border-emerald-100
                rounded-2xl
                p-5
              "
                        >

                            <p className="text-sm text-emerald-600 font-semibold">
                                Verification Status
                            </p>

                            <h3 className="text-xl font-black text-emerald-700 mt-2">
                                Verified Account
                            </h3>

                        </div>

                        <div
                            className="
                bg-indigo-50
                border border-indigo-100
                rounded-2xl
                p-5
              "
                        >

                            <p className="text-sm text-indigo-600 font-semibold">
                                Membership
                            </p>

                            <h3 className="text-xl font-black text-indigo-700 mt-2">
                                Premium Student
                            </h3>

                        </div>

                        <div
                            className="
                bg-violet-50
                border border-violet-100
                rounded-2xl
                p-5
              "
                        >

                            <p className="text-sm text-violet-600 font-semibold">
                                Referral Rank
                            </p>

                            <h3 className="text-xl font-black text-violet-700 mt-2">
                                Gold Member
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}