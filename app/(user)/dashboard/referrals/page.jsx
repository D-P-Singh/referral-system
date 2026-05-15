"use client";

import {
    Users,
    Copy,
    Gift,
    IndianRupee,
    CheckCircle,
    Clock,
} from "lucide-react";
import { useEffect, useState } from "react";



export default function ReferralsPage() {
    const [data, setData] =
        useState(null);

    const [loading, setLoading] =
        useState(true);
    useEffect(() => {

        fetchReferrals();

    }, []);

    const fetchReferrals =
        async () => {
            try {

                const res =
                    await fetch(
                        "/api/user/referrals"
                    );

                const data =
                    await res.json();

                console.log(data);

                if (data.success) {

                    setData(data);

                }

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };
    const referralCode = "DEV100";
    //const referralLink = `https://yourwebsite.com/register?ref=${referralCode}`;
    const referralLink =
        `${window.location.origin}${data?.referralLink}`

    const totalReferrals = 12;
    const successfulReferrals = 8;
    const pendingReferrals = 4;
    const totalRewards = 400;

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralLink);
        alert("Referral link copied successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Referrals
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Invite students and earn rewards
                    </p>
                </div>

                {/* Referral Banner */}
                <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-3xl p-6 md:p-8 shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Gift className="text-yellow-400" size={30} />
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    Refer & Earn
                                </h2>
                            </div>

                            <p className="text-gray-300 leading-7 text-sm md:text-base">
                                Invite your friends and students to register on the platform.
                                Earn ₹100 after every 2 successful referrals.
                            </p>

                            <div className="mt-6 bg-white/10 rounded-2xl p-4 backdrop-blur-md">
                                <p className="text-sm text-gray-300 mb-2">
                                    Your Referral Code
                                </p>

                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-2xl font-bold tracking-widest">
                                        {data ? data.referralCode : "Loading..."}
                                    </h3>

                                    <button
                                        onClick={copyReferralLink}
                                        className="bg-white text-black px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition"
                                    >
                                        <Copy size={18} />
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-md">
                            <p className="text-gray-300 text-sm mb-3">
                                Referral Link
                            </p>

                            <div className="bg-white/10 p-4 rounded-2xl break-all text-sm leading-6">
                                {referralLink}
                            </div>

                            <button
                                onClick={copyReferralLink}
                                className="w-full mt-5 bg-white text-black py-3 rounded-2xl font-semibold hover:opacity-90 transition"
                            >
                                Copy Referral Link
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    <div className="bg-white rounded-3xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Referrals
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    {data?.stats?.total || "0"}
                                </h3>
                            </div>

                            <div className="bg-blue-100 p-3 rounded-2xl">
                                <Users className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Successful
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    {data?.stats?.approved || "0"}
                                </h3>
                            </div>

                            <div className="bg-green-100 p-3 rounded-2xl">
                                <CheckCircle className="text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Pending
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    {data?.stats?.pending || "0"}
                                </h3>
                            </div>

                            <div className="bg-yellow-100 p-3 rounded-2xl">
                                <Clock className="text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Rewards
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    ₹{data?.stats?.totalRewards || "0"}
                                </h3>
                            </div>

                            <div className="bg-purple-100 p-3 rounded-2xl">
                                <IndianRupee className="text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Referral Table */}
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border overflow-hidden">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Referral History
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Students who joined using your referral code
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-b text-left text-gray-500 text-sm">
                                    <th className="pb-4 font-medium">Student</th>
                                    <th className="pb-4 font-medium">Email</th>
                                    <th className="pb-4 font-medium">Date</th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium text-right">
                                        Reward
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data?.referrals?.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-b last:border-none hover:bg-gray-50 transition"
                                    >
                                        <td className="py-5 font-medium text-gray-800">
                                            {item.referredUser?.name}
                                        </td>
                                    
                                        <td className="py-5 text-gray-500">
                                            {item.referredUser?.email}
                                        </td>

                                        <td className="py-5 text-gray-500">
                                            {item.referredUser?.createdAt}
                                        </td>

                                        <td className="py-5">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${item.paymentStatus === "success"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {item?.paymentStatus}
                                            </span>
                                        </td>

                                        <td className="py-5 text-right font-bold text-green-600">
                                            ₹{item.rewardAmount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
