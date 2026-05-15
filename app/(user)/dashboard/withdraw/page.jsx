"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { formatDate }from "@/utils/formatDate";
import {
    Wallet,
    IndianRupee,
    Landmark,
    CheckCircle,
    Clock,
    ArrowUpRight,
} from "lucide-react";

const withdrawals = [
    {
        id: 1,
        amount: 200,
        method: "Bank Transfer",
        status: "completed",
        date: "12 May 2026",
    },
    {
        id: 2,
        amount: 150,
        method: "UPI",
        status: "pending",
        date: "10 May 2026",
    },
    {
        id: 3,
        amount: 300,
        method: "Bank Transfer",
        status: "completed",
        date: "05 May 2026",
    },
];

export default function WithdrawPage() {
    const [amount, setAmount] = useState("");
    const [method, setMethod] =
        useState("Bank Transfer");
    const { user } = useAuth();
    const [withdrawals, setWithdrawals] = useState([]);

    const [formData, setFormData] =
        useState({

            accountHolder: "",

            accountNumber: "",

            ifscCode: "",

            bankName: "",

            upiId: "",

        });
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleWithdraw =
        async (e) => {

            e.preventDefault();

            try {

                const res =
                    await fetch(
                        "/api/user/withdrawals",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify({

                                amount,

                                method,

                                details:
                                    formData,

                            }),

                        }
                    );

                const data =
                    await res.json();

                alert(data.message);

            } catch (error) {

                console.log(error);

            }

        };
    const fetchWithdrawals =
        async () => {
            try {
                const res =
                    await fetch(
                        "/api/user/withdrawals"
                    );
                const data =
                    await res.json();
                console.log(data);
                if (data.success) {
                    setWithdrawals(
                        data.withdrawals
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }
    useEffect(() => {
        // fetch withdrawals

        fetchWithdrawals();
    }, []);
console.log("widhraw histrory",withdrawals)
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Withdraw Money
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Transfer your rewards directly to your bank account or UPI
                    </p>
                </div>

                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Balance Card */}
                    <div className="lg:col-span-1 bg-gradient-to-r from-black to-gray-800 text-white rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm">
                                    Available Balance
                                </p>

                                <h2 className="text-4xl font-bold mt-3 flex items-center gap-1">
                                    <IndianRupee size={34} />
                                    {user?.walletBalance}
                                </h2>
                            </div>

                            <div className="bg-white/10 p-4 rounded-2xl">
                                <Wallet className="text-yellow-400" size={32} />
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-300">
                                    Minimum Withdrawal
                                </span>
                                <span className="font-semibold">
                                    ₹500
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-300">
                                    Processing Time
                                </span>
                                <span className="font-semibold">
                                    24 Hours
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Withdraw Form */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Withdrawal Request
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Enter your withdrawal details below
                            </p>
                        </div>

                        <form
                            onSubmit={handleWithdraw}
                            className="space-y-5"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Withdrawal Amount
                                </label>

                                <div className="relative">
                                    <IndianRupee
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full border rounded-2xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Withdrawal Method
                                </label>

                                <select
                                    value={method}
                                    onChange={(e) =>
                                        setMethod(e.target.value)
                                    }
                                    className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option>
                                        Bank Transfer
                                    </option>

                                    <option>
                                        UPI
                                    </option>
                                </select>
                            </div>

                            <div>
                                {
                                    method === "UPI" ? (

                                        <div className="space-y-5">

                                            {/* Account Holder */}
                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Account Holder Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="accountHolder"
                                                    placeholder="Enter name"
                                                    value={formData.accountHolder}
                                                    onChange={handleChange}
                                                    className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                                />

                                            </div>

                                            {/* UPI */}
                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    UPI ID
                                                </label>

                                                <input
                                                    type="text"
                                                    name="upiId"
                                                    placeholder="example@upi"
                                                    value={formData.upiId}
                                                    onChange={handleChange}
                                                    className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                                />

                                            </div>

                                        </div>

                                    ) : (

                                        <div className="space-y-5">

                                            {/* Name */}
                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Account Holder Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="accountHolder"
                                                    placeholder="Enter name"
                                                    value={formData.accountHolder}
                                                    onChange={handleChange}
                                                    className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                                />

                                            </div>

                                            {/* Account Number */}
                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Account Number
                                                </label>

                                                <input
                                                    type="text"
                                                    name="accountNumber"
                                                    placeholder="Enter account number"
                                                    value={formData.accountNumber}
                                                    onChange={handleChange}
                                                    className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                                />

                                            </div>

                                            {/* IFSC */}
                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    IFSC Code
                                                </label>

                                                <input
                                                    type="text"
                                                    name="ifscCode"
                                                    placeholder="Enter IFSC code"
                                                    value={formData.ifscCode}
                                                    onChange={handleChange}
                                                    className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                                />

                                            </div>

                                            {/* Bank */}
                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Bank Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="bankName"
                                                    placeholder="Enter bank name"
                                                    value={formData.bankName}
                                                    onChange={handleChange}
                                                    className="w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                                />

                                            </div>

                                        </div>

                                    )
                                }
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
                            >
                                Request Withdrawal
                            </button>
                        </form>
                    </div>
                </div>

                {/* Withdrawal Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    <div className="bg-white rounded-3xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Total Withdrawn
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    ₹650
                                </h3>
                            </div>

                            <div className="bg-blue-100 p-3 rounded-2xl">
                                <ArrowUpRight className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-5 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">
                                    Completed
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    5
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
                                    Pending Requests
                                </p>
                                <h3 className="text-2xl font-bold mt-2">
                                    1
                                </h3>
                            </div>

                            <div className="bg-yellow-100 p-3 rounded-2xl">
                                <Clock className="text-yellow-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Withdrawal History */}
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border overflow-hidden">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Withdrawal History
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Recent withdrawal requests and transactions
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead>
                                <tr className="border-b text-left text-gray-500 text-sm">
                                    <th className="pb-4 font-medium">Amount</th>
                                    <th className="pb-4 font-medium">Method</th>
                                    <th className="pb-4 font-medium">Date</th>
                                    <th className="pb-4 font-medium">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {withdrawals.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-b last:border-none hover:bg-gray-50 transition"
                                    >
                                        <td className="py-5 font-bold text-gray-800">
                                            ₹{item.amount}
                                        </td>

                                        <td className="py-5 text-gray-500">
                                            {item.details? item.details.upiId?"UPI" :"Bank Acoount":""}
                                        </td>

                                        <td className="py-5 text-gray-500">
                                            { formatDate(user.createdAt)}
                                        </td>

                                        <td className="py-5">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${item.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
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
