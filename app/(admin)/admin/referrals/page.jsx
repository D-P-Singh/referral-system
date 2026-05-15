"use client";

import { useState } from "react";

import {
    FaUsers,
    FaSearch,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaUserFriends,
    FaWallet,
} from "react-icons/fa";

const referrals = [
    {
        referrer: "Dev Pratap",
        referrerEmail: "dev@example.com",

        referredUser: "Aman Sharma",
        referredEmail: "aman@example.com",

        reward: "₹100",

        status: "approved",

        totalEarned: "₹520",

        joinDate: "15 May 2026",
    },

    {
        referrer: "Rohit Kumar",
        referrerEmail: "rohit@example.com",

        referredUser: "Karan Singh",
        referredEmail: "karan@example.com",

        reward: "₹100",

        status: "pending",

        totalEarned: "₹240",

        joinDate: "14 May 2026",
    },

    {
        referrer: "Aman Verma",
        referrerEmail: "amanv@example.com",

        referredUser: "Pankaj",
        referredEmail: "pankaj@example.com",

        reward: "₹100",

        status: "rejected",

        totalEarned: "₹0",

        joinDate: "13 May 2026",
    },
];

export default function AdminReferralsPage() {

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const filteredReferrals =
        referrals.filter((item) => {

            const matchesSearch =
                item.referrer
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                item.referredUser
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                item.referrerEmail
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                item.referredEmail
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all"
                    ? true
                    : item.status === statusFilter;

            return (
                matchesSearch &&
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
                        Referral Management
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Monitor all referral activities and rewards.
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
                    <FaUsers className="text-slate-500" />

                    <span className="font-bold text-slate-800">
                        Total Referrals: 4,320
                    </span>
                </div>
            </div>

            {/* Stats */}

            <div
                className="
          grid grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
            >
                {/* Approved */}

                <div
                    className="
            bg-white rounded-3xl
            border border-slate-200
            p-6 shadow-sm
          "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500">
                                Approved
                            </p>

                            <h2
                                className="
                  text-4xl font-black
                  text-slate-900 mt-3
                "
                            >
                                2,840
                            </h2>
                        </div>

                        <div
                            className="
                w-14 h-14 rounded-2xl
                bg-green-100 text-green-600
                flex items-center justify-center
                text-2xl
              "
                        >
                            <FaCheckCircle />
                        </div>
                    </div>
                </div>

                {/* Pending */}

                <div
                    className="
            bg-white rounded-3xl
            border border-slate-200
            p-6 shadow-sm
          "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500">
                                Pending
                            </p>

                            <h2
                                className="
                  text-4xl font-black
                  text-slate-900 mt-3
                "
                            >
                                1,120
                            </h2>
                        </div>

                        <div
                            className="
                w-14 h-14 rounded-2xl
                bg-yellow-100 text-yellow-600
                flex items-center justify-center
                text-2xl
              "
                        >
                            <FaClock />
                        </div>
                    </div>
                </div>

                {/* Rejected */}

                <div
                    className="
            bg-white rounded-3xl
            border border-slate-200
            p-6 shadow-sm
          "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500">
                                Rejected
                            </p>

                            <h2
                                className="
                  text-4xl font-black
                  text-slate-900 mt-3
                "
                            >
                                360
                            </h2>
                        </div>

                        <div
                            className="
                w-14 h-14 rounded-2xl
                bg-red-100 text-red-600
                flex items-center justify-center
                text-2xl
              "
                        >
                            <FaTimesCircle />
                        </div>
                    </div>
                </div>

                {/* Reward */}

                <div
                    className="
            bg-white rounded-3xl
            border border-slate-200
            p-6 shadow-sm
          "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500">
                                Referral Rewards
                            </p>

                            <h2
                                className="
                  text-4xl font-black
                  text-slate-900 mt-3
                "
                            >
                                ₹2.8L
                            </h2>
                        </div>

                        <div
                            className="
                w-14 h-14 rounded-2xl
                bg-cyan-100 text-cyan-600
                flex items-center justify-center
                text-2xl
              "
                        >
                            <FaWallet />
                        </div>
                    </div>
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
            xl:grid-cols-3
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
                            placeholder="Search referrals..."
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

                        <option value="approved">
                            Approved
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="rejected">
                            Rejected
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

                    <table className="w-full min-w-[1300px]">

                        <thead>

                            <tr
                                className="
                  bg-slate-50
                  border-b border-slate-200
                "
                            >
                                <th className="text-left py-5 px-6 text-slate-500">
                                    Referrer
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Referred User
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Reward
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Total Earned
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Status
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Join Date
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredReferrals.map((item, index) => (

                                <tr
                                    key={index}
                                    className="
                    border-b border-slate-100
                    hover:bg-slate-50
                    transition
                  "
                                >
                                    {/* Referrer */}

                                    <td className="py-5 px-6">

                                        <div>

                                            <h3
                                                className="
                          font-bold text-slate-900
                        "
                                            >
                                                {item.referrer}
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">
                                                {item.referrerEmail}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Referred User */}

                                    <td className="py-5 px-6">

                                        <div>

                                            <h3
                                                className="
                          font-bold text-slate-900
                        "
                                            >
                                                {item.referredUser}
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">
                                                {item.referredEmail}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Reward */}

                                    <td
                                        className="
                      py-5 px-6
                      font-black text-slate-900
                    "
                                    >
                                        {item.reward}
                                    </td>

                                    {/* Total Earned */}

                                    <td
                                        className="
                      py-5 px-6
                      font-bold text-cyan-600
                    "
                                    >
                                        {item.totalEarned}
                                    </td>

                                    {/* Status */}

                                    <td className="py-5 px-6">

                                        <span
                                            className={`
                        px-4 py-2 rounded-full
                        text-sm font-semibold
                        ${item.status === "approved"
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

                                    {/* Join Date */}

                                    <td className="py-5 px-6">
                                        {item.joinDate}
                                    </td>

                                    {/* Actions */}

                                    <td className="py-5 px-6">

                                        <div className="flex items-center gap-3">

                                            <button
                                                className="
                          h-10 px-4 rounded-xl
                          bg-slate-900
                          text-white font-semibold
                          hover:opacity-90
                          transition
                        "
                                            >
                                                View
                                            </button>

                                            <button
                                                className="
                          h-10 px-4 rounded-xl
                          border border-slate-200
                          hover:bg-slate-50
                          transition
                        "
                                            >
                                                Tree
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredReferrals.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={7}
                                        className="
                      py-16 text-center
                      text-slate-400
                      font-medium
                    "
                                    >
                                        No referrals found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Analytics */}

            <div
                className="
          bg-white rounded-3xl
          border border-slate-200
          p-6 shadow-sm
        "
            >
                <div className="flex items-center gap-3">

                    <FaUserFriends className="text-3xl text-cyan-600" />

                    <div>

                        <h2
                            className="
                text-2xl font-black
                text-slate-900
              "
                        >
                            Referral Insights
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Platform referral performance overview.
                        </p>
                    </div>
                </div>

                <div
                    className="
            mt-8
            h-[280px]
            rounded-3xl
            border border-dashed border-slate-300
            flex flex-col items-center justify-center
            text-slate-400
          "
                >
                    <FaUsers className="text-5xl" />

                    <p className="mt-4 text-lg font-medium">
                        Referral Analytics Chart Area
                    </p>
                </div>
            </div>
        </div>
    );
}