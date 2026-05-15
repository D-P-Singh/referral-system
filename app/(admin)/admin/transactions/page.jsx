"use client";

import { useState } from "react";

import {
    FaSearch,
    FaArrowDown,
    FaArrowUp,
    FaWallet,
} from "react-icons/fa";

const transactions = [
    {
        user: "Dev Pratap",
        email: "dev@example.com",
        amount: "₹500",
        type: "credit",
        source: "recharge",
        status: "success",
        date: "15 May 2026",
    },
    {
        user: "Aman Sharma",
        email: "aman@example.com",
        amount: "₹200",
        type: "debit",
        source: "withdrawal",
        status: "pending",
        date: "14 May 2026",
    },
    {
        user: "Rohit Kumar",
        email: "rohit@example.com",
        amount: "₹50",
        type: "credit",
        source: "daily_reward",
        status: "success",
        date: "13 May 2026",
    },
    {
        user: "Karan Singh",
        email: "karan@example.com",
        amount: "₹300",
        type: "credit",
        source: "referral",
        status: "failed",
        date: "12 May 2026",
    },
];

export default function TransactionsPage() {

    const [search, setSearch] = useState("");

    const [typeFilter, setTypeFilter] =
        useState("all");

    const [sourceFilter, setSourceFilter] =
        useState("all");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const filteredTransactions =
        transactions.filter((item) => {

            const matchesSearch =
                item.user
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.email
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesType =
                typeFilter === "all"
                    ? true
                    : item.type === typeFilter;

            const matchesSource =
                sourceFilter === "all"
                    ? true
                    : item.source === sourceFilter;

            const matchesStatus =
                statusFilter === "all"
                    ? true
                    : item.status === statusFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesSource &&
                matchesStatus
            );
        });

    return (
        <div className="space-y-8">

            {/* Header */}

            <div
                className="
          flex flex-col lg:flex-row
          gap-5 lg:items-center
          lg:justify-between
        "
            >
                <div>

                    <h1
                        className="
              text-4xl font-black
              text-slate-900
            "
                    >
                        Transactions
                    </h1>

                    <p className="text-slate-500 mt-2">
                        View and manage all wallet transactions.
                    </p>
                </div>

                <div
                    className="
            flex items-center gap-3
            bg-white border border-slate-200
            rounded-2xl px-4 h-12
            shadow-sm
          "
                >
                    <FaWallet className="text-slate-500" />

                    <span className="font-bold text-slate-800">
                        Total Transactions: 12,540
                    </span>
                </div>
            </div>

            {/* Filters */}

            <div
                className="
          bg-white rounded-3xl
          border border-slate-200
          p-5 shadow-sm
        "
            >
                <div
                    className="
            grid grid-cols-1
            md:grid-cols-2
            xl:grid-cols-5
            gap-4
          "
                >
                    {/* Search */}

                    <div className="relative xl:col-span-2">

                        <FaSearch
                            className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-slate-400
              "
                        />

                        <input
                            type="text"
                            placeholder="Search user..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                w-full h-12 rounded-2xl
                border border-slate-200
                pl-11 pr-4 outline-none
                focus:ring-2
                focus:ring-cyan-500/30
              "
                        />
                    </div>

                    {/* Type */}

                    <select
                        value={typeFilter}
                        onChange={(e) =>
                            setTypeFilter(e.target.value)
                        }
                        className="
              h-12 rounded-2xl
              border border-slate-200
              px-4 outline-none
            "
                    >
                        <option value="all">
                            All Types
                        </option>

                        <option value="credit">
                            Credit
                        </option>

                        <option value="debit">
                            Debit
                        </option>
                    </select>

                    {/* Source */}

                    <select
                        value={sourceFilter}
                        onChange={(e) =>
                            setSourceFilter(e.target.value)
                        }
                        className="
              h-12 rounded-2xl
              border border-slate-200
              px-4 outline-none
            "
                    >
                        <option value="all">
                            All Sources
                        </option>

                        <option value="recharge">
                            Recharge
                        </option>

                        <option value="withdrawal">
                            Withdrawal
                        </option>

                        <option value="daily_reward">
                            Daily Reward
                        </option>

                        <option value="referral">
                            Referral
                        </option>

                        <option value="bonus">
                            Bonus
                        </option>
                    </select>

                    {/* Status */}

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="
              h-12 rounded-2xl
              border border-slate-200
              px-4 outline-none
            "
                    >
                        <option value="all">
                            All Status
                        </option>

                        <option value="success">
                            Success
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="failed">
                            Failed
                        </option>
                    </select>
                </div>
            </div>

            {/* Table */}

            <div
                className="
          bg-white rounded-3xl
          border border-slate-200
          shadow-sm overflow-hidden
        "
            >
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1100px]">

                        <thead>

                            <tr
                                className="
                  border-b border-slate-200
                  bg-slate-50
                "
                            >
                                <th className="text-left py-5 px-6 text-slate-500">
                                    User
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Amount
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Type
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Source
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Status
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredTransactions.map((item, index) => (

                                <tr
                                    key={index}
                                    className="
                    border-b border-slate-100
                    hover:bg-slate-50
                    transition
                  "
                                >
                                    {/* User */}

                                    <td className="py-5 px-6">

                                        <div>

                                            <h3
                                                className="
                          font-bold text-slate-900
                        "
                                            >
                                                {item.user}
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">
                                                {item.email}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Amount */}

                                    <td
                                        className="
                      py-5 px-6
                      font-black text-slate-900
                    "
                                    >
                                        {item.amount}
                                    </td>

                                    {/* Type */}

                                    <td className="py-5 px-6">

                                        <span
                                            className={`
                        inline-flex items-center gap-2
                        px-4 py-2 rounded-full
                        text-sm font-semibold
                        ${item.type === "credit"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }
                      `}
                                        >
                                            {item.type === "credit"
                                                ? <FaArrowDown />
                                                : <FaArrowUp />
                                            }

                                            {item.type}
                                        </span>
                                    </td>

                                    {/* Source */}

                                    <td className="py-5 px-6">

                                        <span
                                            className="
                        px-4 py-2 rounded-full
                        bg-slate-100
                        text-slate-700
                        text-sm font-semibold
                      "
                                        >
                                            {item.source}
                                        </span>
                                    </td>

                                    {/* Status */}

                                    <td className="py-5 px-6">

                                        <span
                                            className={`
                        px-4 py-2 rounded-full
                        text-sm font-semibold
                        ${item.status === "success"
                                                    ? "bg-green-100 text-green-700"
                                                    : item.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                      `}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Date */}

                                    <td className="py-5 px-6">
                                        {item.date}
                                    </td>
                                </tr>
                            ))}

                            {filteredTransactions.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={6}
                                        className="
                      py-16 text-center
                      text-slate-400
                      font-medium
                    "
                                    >
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}