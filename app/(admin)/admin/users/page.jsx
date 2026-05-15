"use client";

import { useEffect, useState } from "react";

import {
    FaUsers,
    FaSearch,
    FaUserCheck,
    FaUserSlash,
    FaWallet,
    FaEye,
    FaTrash,
} from "react-icons/fa";
import { formatDate } from "../../../../utils/formatDate";
import Link from "next/link";



export default function AdminUsersPage() {

    const [search, setSearch] =
        useState("");
    const [users, setUsers] = useState([]);
    const [statusFilter, setStatusFilter] =
        useState("all");
    const fetchUsers = async () => {
        let res = await fetch("/api/admin/users/")
        res = await res.json();
        setUsers(res?.users)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    //console.log(users)

    const filteredUsers =
        users.filter((item) => {

            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                item.email
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                item.phone
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
                        Users Management
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage all registered users and wallets.
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
                        Total Users: 12,540
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
                {/* Total */}

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
                                Total Users
                            </p>

                            <h2
                                className="
                  text-4xl font-black
                  text-slate-900 mt-3
                "
                            >
                                12.5K
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
                            <FaUsers />
                        </div>
                    </div>
                </div>

                {/* Active */}

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
                                Active Users
                            </p>

                            <h2
                                className="
                  text-4xl font-black
                  text-slate-900 mt-3
                "
                            >
                                10.2K
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
                            <FaUserCheck />
                        </div>
                    </div>
                </div>

                {/* Blocked */}

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
                                Blocked Users
                            </p>

                            <h2
                                className="
                  text-4xl font-black
                  text-slate-900 mt-3
                "
                            >
                                340
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
                            <FaUserSlash />
                        </div>
                    </div>
                </div>

                {/* Wallet */}

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
                                Wallet Balance
                            </p>

                            <h2
                                className="
                  text-4xl font-black
                  text-slate-900 mt-3
                "
                            >
                                ₹8.4L
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
                            placeholder="Search users..."
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

                        <option value="active">
                            Active
                        </option>

                        <option value="blocked">
                            Blocked
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

                    <table className="w-full min-w-[1200px]">

                        <thead>

                            <tr
                                className="
                  bg-slate-50
                  border-b border-slate-200
                "
                            >
                                <th className="text-left py-5 px-6 text-slate-500">
                                    User
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Phone
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Wallet
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Referrals
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Status
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Joined
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredUsers.map((item, index) => (

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

                                        <div className="flex items-center gap-4">

                                            <img
                                                src="https://i.pravatar.cc/100"
                                                alt="user"
                                                className="
                          w-12 h-12 rounded-2xl
                          object-cover
                        "
                                            />

                                            <div>

                                                <h3
                                                    className="
                            font-bold text-slate-900
                          "
                                                >
                                                    {item.name}
                                                </h3>

                                                <p className="text-sm text-slate-500 mt-1">
                                                    {item.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Phone */}

                                    <td className="py-5 px-6">
                                        {item.phone}
                                    </td>

                                    {/* Wallet */}

                                    <td
                                        className="
                      py-5 px-6
                      font-black text-cyan-600
                    "
                                    >
                                        {item.wallet?.balance}
                                    </td>

                                    {/* Referrals */}

                                    <td className="py-5 px-6">
                                        {item?.referrals}
                                    </td>

                                    {/* Status */}

                                    <td className="py-5 px-6">

                                        <span
                                            className={`
                        px-4 py-2 rounded-full
                        text-sm font-semibold
                        ${item.accountStatus === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }
                      `}
                                        >
                                            {item?.accountStatus}
                                        </span>
                                    </td>

                                    {/* Joined */}

                                    <td className="py-5 px-6">
                                        {formatDate(item.wallet?.createdAt)}
                                    </td>

                                    {/* Actions */}

                                    <td className="py-5 px-6">

                                        <div className="flex items-center gap-3">

                                            <Link href={`/admin/users/${item._id}`}>
                                                <button
                                                    className="
      h-10 px-4 rounded-xl
      bg-slate-900
      text-white font-semibold
      hover:opacity-90
      transition
      flex items-center gap-2
    "
                                                >
                                                    <FaEye />
                                                    View
                                                </button>
                                            </Link>

                                            <button
                                                className="
                          h-10 px-4 rounded-xl
                          bg-red-500
                          text-white font-semibold
                          hover:bg-red-600
                          transition
                          flex items-center gap-2
                        "
                                            >
                                                <FaTrash />

                                                Block
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={7}
                                        className="
                      py-16 text-center
                      text-slate-400
                      font-medium
                    "
                                    >
                                        No users found.
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