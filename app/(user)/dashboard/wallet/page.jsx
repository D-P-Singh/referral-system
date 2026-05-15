"use client";

import {
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    Gift,
    IndianRupee,
    Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";


export default function WalletPage() {
    const {user,wallet} =  useAuth();
    console.log("wallet",wallet)
    const [transactions, setTransactions] =useState([]);

    const [loading, setLoading] =
        useState(true);
    useEffect(() => {

        fetchWallet();

    }, []);

    const fetchWallet =
        async () => {

            try {

                const res =
                    await fetch(
                        "/api/user/wallet/history"
                    );
                const data =
                    await res.json();

              //  console.log("Wallet Data:", data);

                if (data.success) {
                    setTransactions(data.transactions);
                }

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };
       // console.log("Wallet State:", transactions);
    if (loading) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );

    }
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            My Wallet
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage your rewards and withdrawals
                        </p>
                    </div>

                    <button className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:opacity-90 transition">
                        Withdraw Money
                    </button>
                </div>

                {/* Wallet Balance Card */}
                <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-3xl p-6 md:p-8 shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <p className="text-gray-300 text-sm">
                                Available Balance
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold mt-2 flex items-center gap-1">
                                <IndianRupee size={36} />
                                {wallet?.balance ?? 0}
                            </h2>

                            <p className="text-gray-300 mt-3 text-sm">
                                Updated just now
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 w-full md:w-[280px]">
                            <div className="flex items-center gap-3 mb-4">
                                <Wallet className="text-yellow-400" />
                                <h3 className="font-semibold text-lg">
                                    Reward Wallet
                                </h3>
                            </div>

                            <p className="text-sm text-gray-300 leading-6">
                                Earn rewards by referring students and withdraw directly into your bank account.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    <div className="bg-white rounded-3xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Earned
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    ₹{wallet?.totalEarned ?? 0}
                                </h3>
                            </div>

                            <div className="bg-green-100 p-3 rounded-2xl">
                                <ArrowDownLeft className="text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Withdrawn
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    ₹{wallet?.totalWithdrawn ?? 0}
                                </h3>
                            </div>

                            <div className="bg-red-100 p-3 rounded-2xl">
                                <ArrowUpRight className="text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Pending Rewards
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    ₹{wallet?.pendingWithdraw ?? 0}
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
                                    Referral Bonus
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    ₹{wallet?.referrals ?? 0}
                                </h3>
                            </div>

                            <div className="bg-blue-100 p-3 rounded-2xl">
                                <Gift className="text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Recent Transactions
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Your latest wallet activities
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b text-left text-gray-500 text-sm">
                                    <th className="pb-4 font-medium">Type</th>
                                    <th className="pb-4 font-medium">Date</th>
                                    <th className="pb-4 font-medium">Status</th>
                                    <th className="pb-4 font-medium">Type</th>
                                    <th className="pb-4 font-medium text-right">Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-b last:border-none hover:bg-gray-50 transition"
                                    >
                                        <td className="py-5 font-medium text-gray-800">
                                            {item.type}
                                        </td>

                                        <td className="py-5 text-gray-500">
                                            {item.date}
                                        </td>

                                        <td className="py-5">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${item.status === "success"
                                                        ? "bg-green-100 text-green-700"
                                                        :item.status === "pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
<td className="py-5 text-gray-500">
                                            {item.source}
                                        </td>
                                        <td
                                            className={`py-5 text-right font-bold ${item.status === "success"
                                                ? "text-green-600"
                                                : item.status === "pending"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {item.status === "success" ? "+" : "-"}₹
                                            {item.amount}
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
