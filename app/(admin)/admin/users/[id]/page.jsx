"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    FaWallet,
    FaUsers,
    FaMoneyBillWave,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaUserShield,
    FaEdit,
    FaTrash,
    FaArrowDown,
    FaArrowUp,
} from "react-icons/fa";
import { formatDate } from "@/utils/formatDate";



export default function AdminUserViewPage() {
    const [transactions, setTransactions] = useState([]);
    const [wallet, setWallet] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [user, setUser] = useState();



    const { id } = useParams();
    const userDetails = async () => {
        let res = await fetch(`/api/admin/users/${id}`)
        res = await res.json();
        setWallet(res.data?.wallet);
        setUser(res.data?.user);
        setTransactions(res.data.transactions)
        console.log(res)
    }
    useEffect(() => {
        userDetails();
    }, [id])

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
                        User Full Details
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage user profile, wallet, referrals and transactions.
                    </p>
                </div>

                <div className="flex items-center gap-4">

                    <button
                        className="
              h-12 px-5 rounded-2xl
              bg-slate-900 text-white
              font-bold
              flex items-center gap-2
              hover:opacity-90
            "
                    >
                        <FaEdit />

                        Edit User
                    </button>

                    <button
                        className="
              h-12 px-5 rounded-2xl
              bg-red-500 text-white
              font-bold
              flex items-center gap-2
              hover:bg-red-600
            "
                    >
                        <FaTrash />

                        Delete
                    </button>
                </div>
            </div>

            {/* Top User Card */}

            <div
                className="
          bg-white rounded-3xl
          border border-slate-200
          p-6 shadow-sm
        "
            >
                <div
                    className="
            flex flex-col lg:flex-row
            gap-8 lg:items-center
          "
                >
                    {/* Left */}

                    <div className="flex items-center gap-5">

                        <img
                            src="https://i.pravatar.cc/200"
                            alt="user"
                            className="
                w-28 h-28 rounded-3xl
                object-cover
              "
                        />

                        <div>

                            <h2
                                className="
                  text-3xl font-black
                  text-slate-900
                "
                            >
                               {user?.name}
                            </h2>

                            <p className="text-slate-500 mt-2">
                              {user?.email}
                            </p>

                            <div className="flex items-center gap-3 mt-4">

                                <span
                                    className="
                    px-4 py-2 rounded-full
                    bg-green-100 text-green-700
                    text-sm font-semibold
                  "
                                >
{user?.accountStatus}                                </span>

                                <span
                                    className="
                    px-4 py-2 rounded-full
                    bg-cyan-100 text-cyan-700
                    text-sm font-semibold
                  "
                                >
                                    User
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right */}

                    <div
                        className="
              flex-1
              grid grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-4
            "
                    >
                        {/* Wallet */}

                        <div
                            className="
                  bg-slate-50 rounded-2xl
                  border border-slate-200
                  p-5
                "
                        >
                            <div className="flex items-center gap-3">

                                <div
                                    className="
                      w-12 h-12 rounded-2xl
                      bg-cyan-100 text-cyan-600
                      flex items-center justify-center
                    "
                                >
                                    <FaWallet />
                                </div>

                                <div>

                                    <p className="text-slate-500 text-sm">
                                        Wallet
                                    </p>

                                    <h3
                                        className="
                          text-2xl font-black
                          text-slate-900
                        "
                                    >
                                        {wallet?.balance}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Earned */}

                        <div
                            className="
                  bg-slate-50 rounded-2xl
                  border border-slate-200
                  p-5
                "
                        >
                            <div className="flex items-center gap-3">

                                <div
                                    className="
                      w-12 h-12 rounded-2xl
                      bg-green-100 text-green-600
                      flex items-center justify-center
                    "
                                >
                                    <FaMoneyBillWave />
                                </div>

                                <div>

                                    <p className="text-slate-500 text-sm">
                                        Earned
                                    </p>

                                    <h3
                                        className="
                          text-2xl font-black
                          text-slate-900
                        "
                                    >
                                        ₹{wallet?.totalEarned}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Referrals */}

                        <div
                            className="
                  bg-slate-50 rounded-2xl
                  border border-slate-200
                  p-5
                "
                        >
                            <div className="flex items-center gap-3">

                                <div
                                    className="
                      w-12 h-12 rounded-2xl
                      bg-yellow-100 text-yellow-600
                      flex items-center justify-center
                    "
                                >
                                    <FaUsers />
                                </div>

                                <div>

                                    <p className="text-slate-500 text-sm">
                                        Referrals
                                    </p>

                                    <h3
                                        className="
                          text-2xl font-black
                          text-slate-900
                        "
                                    >
                                       {referrals?.length}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Activation */}

                        <div
                            className="
                  bg-slate-50 rounded-2xl
                  border border-slate-200
                  p-5
                "
                        >
                            <div className="flex items-center gap-3">

                                <div
                                    className="
                      w-12 h-12 rounded-2xl
                      bg-purple-100 text-purple-600
                      flex items-center justify-center
                    "
                                >
                                    <FaUserShield />
                                </div>

                                <div>

                                    <p className="text-slate-500 text-sm">
                                        Activation
                                    </p>

                                    <h3
                                        className="
                          text-lg font-black
                          text-green-600
                        "
                                    >
                                        Activated
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Details */}

            <div
                className="
          grid grid-cols-1
          xl:grid-cols-3
          gap-6
        "
            >
                {/* Personal */}

                <div
                    className="
            bg-white rounded-3xl
            border border-slate-200
            p-6 shadow-sm
          "
                >
                    <h2
                        className="
              text-2xl font-black
              text-slate-900 mb-6
            "
                    >
                        Personal Details
                    </h2>

                    <div className="space-y-5">

                        <div>
                            <p className="text-slate-500 text-sm">
                                Full Name
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                Dev Pratap
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Email
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                dev@example.com
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Phone
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                +91 9876543210
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Joined Date
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                15 May 2026
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Wallet Details */}

                <div
                    className="
            bg-white rounded-3xl
            border border-slate-200
            p-6 shadow-sm
          "
                >
                    <h2
                        className="
              text-2xl font-black
              text-slate-900 mb-6
            "
                    >
                        Wallet Details
                    </h2>

                    <div className="space-y-5">

                        <div>
                            <p className="text-slate-500 text-sm">
                                Current Balance
                            </p>

                            <h3 className="font-black text-cyan-600 text-2xl mt-1">
                                ₹540
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Total Earned
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                ₹2,540
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Total Withdraw
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                ₹1,000
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Last Recharge
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                ₹500
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Referral Details */}

                <div
                    className="
            bg-white rounded-3xl
            border border-slate-200
            p-6 shadow-sm
          "
                >
                    <h2
                        className="
              text-2xl font-black
              text-slate-900 mb-6
            "
                    >
                        Referral Details
                    </h2>

                    <div className="space-y-5">

                        <div>
                            <p className="text-slate-500 text-sm">
                                Referral Code
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                DEV123
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Total Referrals
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                12
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Active Referrals
                            </p>

                            <h3 className="font-bold text-slate-900 mt-1">
                                8
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Referral Income
                            </p>

                            <h3 className="font-black text-green-600 text-xl mt-1">
                                ₹1,200
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions */}

            <div
                className="
          bg-white rounded-3xl
          border border-slate-200
          shadow-sm overflow-hidden
        "
            >
                <div className="p-6 border-b border-slate-200">

                    <h2
                        className="
              text-2xl font-black
              text-slate-900
            "
                    >
                        User Transactions
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Complete transaction history.
                    </p>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px]">

                        <thead>

                            <tr
                                className="
                  bg-slate-50
                  border-b border-slate-200
                "
                            >
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

                            {transactions.map((item, index) => (

                                <tr
                                    key={index}
                                    className="
                    border-b border-slate-100
                    hover:bg-slate-50
                    transition
                  "
                                >
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
                                        {formatDate(item?.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}