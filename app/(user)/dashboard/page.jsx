"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
    FaArrowUp,
    FaWallet,
    FaUsers,
    FaMoneyBillWave,
    FaCopy,
    FaChartLine,
    FaGift,
} from "react-icons/fa";
import { success } from "zod";
import OffersCard from "../../../components/dashboard/OfferCard";

export default function DashboardPage() {

    const {
        user,
        wallet,
        loading,
        totalReferrals,
        referralLevels,
        totalNetworkUsers,
        transactions,
    } = useAuth();

    useEffect(() => {

    }, []);

    // copy referral code
    const copyReferralCode = () => {

        navigator.clipboard.writeText(
            user?.referralCode
        );

        alert("Referral Code Copied");

    };

    // loading
    if (loading) {

        return (

            <div
                className="
                    min-h-[80vh]
                    flex items-center justify-center
                "
            >

                <div
                    className="
                        w-14 h-14
                        border-4 border-indigo-500
                        border-t-transparent
                        rounded-full
                        animate-spin
                    "
                />

            </div>
        );
    }

    return (

        <div className={`space-y-8`}>
            

            {/* Welcome Banner */}
{
                user?.paymentStatus == "success" ? <div
                    className="
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-purple-600
                    rounded-3xl
                    p-8
                    text-white
                    shadow-2xl
                    relative overflow-hidden
                "
                >

                    <div
                        className="
                        absolute top-0 right-0
                        w-72 h-72
                        bg-white/10
                        rounded-full blur-3xl
                    "
                    />

                    <div className="relative z-10">

                        <p
                            className="
                            text-sm uppercase
                            tracking-widest
                            text-indigo-100
                        "
                        >
                            Member Dashboard
                        </p>

                        <h1
                            className="
                            text-3xl sm:text-5xl
                            font-black mt-3
                        "
                        >
                            Welcome Back,
                            {" "}
                            {user?.name}
                            👋
                        </h1>

                        <p
                            className="
                            mt-4
                            text-indigo-100
                            max-w-2xl
                            leading-7
                        "
                        >
                            Track your earnings,
                            referrals, rewards and
                            withdrawals from one
                            premium dashboard.
                        </p>

                        <button
                            className="
                            mt-6
                            bg-white
                            text-indigo-700
                            px-6 py-3
                            rounded-2xl
                            font-bold
                            hover:scale-105
                            transition-all duration-300
                        "
                        >
                            Explore Rewards
                        </button>

                    </div>

                </div> : <div
                    className="
      bg-amber-50
      border border-amber-200
      text-amber-700
      rounded-2xl
      p-5
   "
                >

                         
                    <h2 className="font-bold text-lg">
                            Activate Your Account 🚀
                       
                    </h2>

                    <p className="mt-2 text-sm leading-6">
                        Complete your first payment to
                        activate your account and unlock:

                        • Referral Earnings
                        • Rewards
                        • Team Network
                        • Withdrawals
                    </p>


                        <Link className="cursor-pointer" href={"/dashboard/recharge"}>
                            <button
                                className=" mt-4 h-12 px-5 rounded-xl bg-amber-500 text-white font-bold cursor-pointer "
                            >
                               Activate Now
                            </button>
                               </Link>
                        
                 

                </div>
}

{/*  */}
{/* <OffersCard/> */}


            {/* Stats Cards */}

            <div
                className={`${user?.paymentStatus == "success" ? "grid sm:grid-cols-2 xl:grid-cols-4 gap-6" :"grid sm:grid-cols-2 xl:grid-cols-4 gap-6 opacity-50"}`}
            >

                {/* Wallet */}

                <div
                    className="
                        bg-white rounded-3xl
                        p-6 shadow-lg
                        border border-slate-100
                        hover:-translate-y-1
                        transition-all duration-300
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500 text-sm">
                                Wallet Balance
                            </p>

                            <h2
                                className="
                                    text-2xl sm:text-3xl
                                    font-black mt-2
                                "
                            >
                                ₹{wallet?.balance || 0}
                            </h2>

                        </div>

                        <div
                            className="
                                w-16 h-16
                                rounded-2xl
                                bg-indigo-100
                                flex items-center justify-center
                                text-indigo-600 text-2xl
                            "
                        >

                            <FaWallet />

                        </div>

                    </div>

                    <div
                        className="
                            mt-5 flex items-center
                            gap-2 text-emerald-500
                            text-sm font-semibold
                        "
                    >

                        <FaArrowUp />

                        +12% this month

                    </div>

                </div>

                {/* Earnings */}

                <div
                    className="
                        bg-white rounded-3xl
                        p-6 shadow-lg
                        border border-slate-100
                        hover:-translate-y-1
                        transition-all duration-300
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500 text-sm">
                                Total Earned
                            </p>

                            <h2
                                className="
                                    text-2xl sm:text-3xl
                                    font-black mt-2
                                "
                            >
                                ₹{wallet?.totalEarned || 0}
                            </h2>

                        </div>

                        <div
                            className="
                                w-16 h-16
                                rounded-2xl
                                bg-emerald-100
                                flex items-center justify-center
                                text-emerald-600 text-2xl
                            "
                        >

                            <FaMoneyBillWave />

                        </div>

                    </div>

                    <div
                        className="
                            mt-5 flex items-center
                            gap-2 text-emerald-500
                            text-sm font-semibold
                        "
                    >

                        <FaArrowUp />

                        +18% growth

                    </div>

                </div>

                {/* Referrals */}

                <div
                    className="
                        bg-white rounded-3xl
                        p-6 shadow-lg
                        border border-slate-100
                        hover:-translate-y-1
                        transition-all duration-300
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500 text-sm">
                                Direct Referrals
                            </p>

                            <h2
                                className="
                                    text-2xl sm:text-3xl
                                    font-black mt-2
                                "
                            >
                                {totalReferrals || 0}
                            </h2>

                        </div>

                        <div
                            className="
                                w-16 h-16
                                rounded-2xl
                                bg-violet-100
                                flex items-center justify-center
                                text-violet-600 text-2xl
                            "
                        >

                            <FaUsers />

                        </div>

                    </div>

                    <div
                        className="
                            mt-5 flex items-center
                            gap-2 text-emerald-500
                            text-sm font-semibold
                        "
                    >

                        <FaArrowUp />

                        Growing Fast

                    </div>

                </div>

                {/* Rewards */}

                <div
                    className="
                        bg-white rounded-3xl
                        p-6 shadow-lg
                        border border-slate-100
                        hover:-translate-y-1
                        transition-all duration-300
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500 text-sm">
                                Rewards
                            </p>

                            <h2
                                className="
                                    text-2xl sm:text-3xl
                                    font-black mt-2
                                "
                            >
                                {user?.rewards || 0}
                            </h2>

                        </div>

                        <div
                            className="
                                w-16 h-16
                                rounded-2xl
                                bg-pink-100
                                flex items-center justify-center
                                text-pink-600 text-2xl
                            "
                        >

                            <FaGift />

                        </div>

                    </div>

                    <div
                        className="
                            mt-5 flex items-center
                            gap-2 text-emerald-500
                            text-sm font-semibold
                        "
                    >

                        <FaArrowUp />

                        Active rewards

                    </div>

                </div>

            </div>

            {/* Referral + Actions */}

            <div
                className="
        grid xl:grid-cols-3
        gap-6
    "
            >

                {/* Network Levels */}

                <div
                    className={`${user?.paymentStatus == "success" ? "    xl:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-slate-100" : "    xl:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-slate-100 opacity-50"}`}
        
                >

                    <div
                        className={`${user?.paymentStatus == "success" ? "flex items-center justify-between flex-wrap gap-4" :"flex items-center justify-between flex-wrap gap-4 opacity-50"}`}
                    >

                        <div>

                            <h2
                                className="
                        text-2xl
                        font-black
                        text-slate-900
                    "
                            >
                                Your Referral Network 🌐
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Track your growing team and
                                referral levels in real-time.
                            </p>

                        </div>

                        <div
                            className="
                    w-16 h-16
                    rounded-2xl
                    bg-violet-100
                    flex items-center justify-center
                    text-violet-600 text-2xl
                "
                        >

                            <FaUsers />

                        </div>

                    </div>

                    {/* Levels Grid */}

                    <div
                        className={`${user?.paymentStatus == "success" ? " grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8" :" grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8 opacity-50"}`}
                    >

                        {referralLevels?.map((level) => (

                            <div
                                key={level.level}
                                className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        border border-slate-200
                        p-6
                        bg-gradient-to-br
                        from-slate-50
                        to-white
                        hover:shadow-xl
                        hover:-translate-y-1
                        transition-all duration-300
                    "
                            >

                                <div
                                    className="
                            absolute
                            top-0 right-0
                            w-24 h-24
                            bg-violet-100/50
                            rounded-full
                            blur-2xl
                        "
                                />

                                <div className="relative z-10">

                                    <p
                                        className="
                                text-sm
                                font-semibold
                                text-violet-600
                                uppercase
                                tracking-wider
                            "
                                    >
                                        Level {level.level}
                                    </p>

                                    <h2
                                        className="
                                text-5xl
                                font-black
                                mt-4
                                text-slate-900
                            "
                                    >
                                        {level.totalUsers}
                                    </h2>

                                    <p
                                        className="
                                mt-3
                                text-slate-500
                                text-sm
                            "
                                    >
                                        Team Members
                                    </p>

                                    <div
                                        className="
                                mt-5
                                flex items-center
                                gap-2
                                text-emerald-500
                                text-sm
                                font-bold
                            "
                                    >

                                        <FaArrowUp />

                                        Growing Fast

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Team Summary */}

                <div
                    className={`${user?.paymentStatus == "success" ? " bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden" :"bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden opacity-50"}`}
                >

                    <div
                        className="
                absolute top-0 right-0
                w-52 h-52
                bg-white/10
                rounded-full blur-3xl
            "
                    />

                    <div className="relative z-10">

                        <p
                            className="
                    uppercase
                    tracking-widest
                    text-sm
                    text-indigo-100
                "
                        >
                            Team Overview
                        </p>

                        <h2
                            className="
                    text-5xl
                    font-black
                    mt-5
                "
                        >
                            {totalNetworkUsers || 0}
                        </h2>

                        <p
                            className="
                    mt-3
                    text-indigo-100
                    leading-7
                "
                        >
                            Total users joined under
                            your referral network.
                        </p>

                        {/* Stats */}

                        <div className="mt-8 space-y-5">

                            <div
                                className="
                        bg-white/10
                        backdrop-blur-md
                        rounded-2xl
                        p-4
                        flex items-center
                        justify-between
                    "
                            >

                                <span className="text-indigo-100">
                                    Direct Referrals
                                </span>

                                <span className="font-black text-2xl">
                                    {totalReferrals || 0}
                                </span>

                            </div>

                            <div
                                className="
                        bg-white/10
                        backdrop-blur-md
                        rounded-2xl
                        p-4
                        flex items-center
                        justify-between
                    "
                            >

                                <span className="text-indigo-100">
                                    Active Levels
                                </span>

                                <span className="font-black text-2xl">
                                    {
                                        referralLevels?.filter(
                                            (item) =>
                                                item.totalUsers > 0
                                        ).length
                                    }
                                </span>

                            </div>

                            <div
                                className="
                        bg-white/10
                        backdrop-blur-md
                        rounded-2xl
                        p-4
                        flex items-center
                        justify-between
                    "
                            >

                                <span className="text-indigo-100">
                                    Rewards Earned
                                </span>

                                <span className="font-black text-2xl">
                                    ₹{wallet?.totalEarned || 0}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}