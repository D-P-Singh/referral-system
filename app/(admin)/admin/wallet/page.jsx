"use client"
import { useState } from "react";

export default function AdminWallet() {
    const [tab, setTab] = useState("all");

    const transactions = [
        { id: 1, user: "Dev Pratap", type: "credit", amount: 500, date: "2026-05-10" },
        { id: 2, user: "Aman", type: "debit", amount: 200, date: "2026-05-11" },
        { id: 3, user: "Ravi", type: "credit", amount: 1000, date: "2026-05-12" },
    ];

    const filtered = transactions.filter((t) => {
        if (tab === "all") return true;
        return t.type === tab;
    });

    const totalCredit = transactions
        .filter((t) => t.type === "credit")
        .reduce((a, b) => a + b.amount, 0);

    const totalDebit = transactions
        .filter((t) => t.type === "debit")
        .reduce((a, b) => a + b.amount, 0);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* Header */}
            <h1 className="text-2xl font-bold mb-4">Admin Wallet Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="text-gray-500">Total Balance</h2>
                    <p className="text-2xl font-bold">₹{totalCredit - totalDebit}</p>
                </div>

                <div className="bg-green-100 p-4 rounded-xl shadow">
                    <h2 className="text-green-700">Total Credit</h2>
                    <p className="text-2xl font-bold text-green-700">₹{totalCredit}</p>
                </div>

                <div className="bg-red-100 p-4 rounded-xl shadow">
                    <h2 className="text-red-700">Total Debit</h2>
                    <p className="text-2xl font-bold text-red-700">₹{totalDebit}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 mb-4">
                {["all", "credit", "debit"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 rounded-lg ${tab === t ? "bg-black text-white" : "bg-white"
                            }`}
                    >
                        {t.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3">User</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((t) => (
                            <tr key={t.id} className="border-t">
                                <td className="p-3">{t.user}</td>

                                <td className="p-3">
                                    <span
                                        className={
                                            t.type === "credit"
                                                ? "text-green-600 font-semibold"
                                                : "text-red-600 font-semibold"
                                        }
                                    >
                                        {t.type}
                                    </span>
                                </td>

                                <td className="p-3">₹{t.amount}</td>
                                <td className="p-3">{t.date}</td>

                                <td className="p-3 flex gap-2">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded">
                                        View
                                    </button>
                                    <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}