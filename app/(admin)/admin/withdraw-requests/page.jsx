"use client";

import {
    FaCheck,
    FaTimes,
    FaClock,
    FaSearch,
    FaWallet,
} from "react-icons/fa";

const requests = [
    {
        name: "Dev Pratap",
        email: "dev@example.com",
        amount: "₹500",
        method: "UPI",
        upi: "dev@upi",
        status: "Pending",
        date: "15 May 2026",
    },
    {
        name: "Aman Sharma",
        email: "aman@example.com",
        amount: "₹1200",
        method: "Bank",
        upi: "aman@upi",
        status: "Approved",
        date: "14 May 2026",
    },
    {
        name: "Rohit Kumar",
        email: "rohit@example.com",
        amount: "₹300",
        method: "UPI",
        upi: "rohit@upi",
        status: "Rejected",
        date: "13 May 2026",
    },
];

export default function WithdrawRequestsPage() {

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
                        Withdraw Requests
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage and approve withdrawal requests.
                    </p>
                </div>

                <div
                    className="
            flex items-center gap-3
            bg-white
            border border-slate-200
            rounded-2xl
            px-4 h-12
            shadow-sm
          "
                >
                    <FaWallet className="text-slate-500" />

                    <span className="font-bold text-slate-800">
                        Total Pending: ₹24,500
                    </span>
                </div>
            </div>

            {/* Top Cards */}

            <div
                className="
          grid grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
            >
                {/* Pending */}

                <div
                    className="
            bg-white
            rounded-3xl
            p-6
            border border-slate-200
            shadow-sm
          "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-500">
                                Pending Requests
                            </p>

                            <h2
                                className="
                  text-4xl font-black
                  text-slate-900 mt-3
                "
                            >
                                58
                            </h2>
                        </div>

                        <div
                            className="
                w-14 h-14 rounded-2xl
                bg-yellow-100
                text-yellow-600
                text-2xl
                flex items-center justify-center
              "
                        >
                            <FaClock />
                        </div>
                    </div>
                </div>

                {/* Approved */}

                <div
                    className="
            bg-white
            rounded-3xl
            p-6
            border border-slate-200
            shadow-sm
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
                                240
                            </h2>
                        </div>

                        <div
                            className="
                w-14 h-14 rounded-2xl
                bg-green-100
                text-green-600
                text-2xl
                flex items-center justify-center
              "
                        >
                            <FaCheck />
                        </div>
                    </div>
                </div>

                {/* Rejected */}

                <div
                    className="
            bg-white
            rounded-3xl
            p-6
            border border-slate-200
            shadow-sm
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
                                16
                            </h2>
                        </div>

                        <div
                            className="
                w-14 h-14 rounded-2xl
                bg-red-100
                text-red-600
                text-2xl
                flex items-center justify-center
              "
                        >
                            <FaTimes />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}

            <div
                className="
          bg-white
          rounded-3xl
          border border-slate-200
          shadow-sm
          overflow-hidden
        "
            >
                {/* Top */}

                <div
                    className="
            flex flex-col lg:flex-row
            gap-4 lg:items-center
            lg:justify-between
            p-6 border-b border-slate-200
          "
                >
                    <div>

                        <h2
                            className="
                text-2xl font-black
                text-slate-900
              "
                        >
                            All Requests
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Review withdrawal requests.
                        </p>
                    </div>

                    {/* Search */}

                    <div
                        className="
              relative
              w-full lg:w-[320px]
            "
                    >
                        <FaSearch
                            className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-slate-400
              "
                        />

                        <input
                            type="text"
                            placeholder="Search request..."
                            className="
                w-full h-12
                rounded-2xl
                border border-slate-200
                pl-11 pr-4
                outline-none
                focus:ring-2
                focus:ring-cyan-500/30
              "
                        />
                    </div>
                </div>

                {/* Table */}

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[1000px]">

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
                                    Method
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    UPI / Account
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Date
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Status
                                </th>

                                <th className="text-left py-5 px-6 text-slate-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {requests.map((item, index) => (

                                <tr
                                    key={index}
                                    className="
                    border-b border-slate-100
                    hover:bg-slate-50
                    transition
                  "
                                >
                                    <td className="py-5 px-6">

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
                                    </td>

                                    <td
                                        className="
                      py-5 px-6
                      font-black text-slate-900
                    "
                                    >
                                        {item.amount}
                                    </td>

                                    <td className="py-5 px-6">
                                        {item.method}
                                    </td>

                                    <td className="py-5 px-6">
                                        {item.upi}
                                    </td>

                                    <td className="py-5 px-6">
                                        {item.date}
                                    </td>

                                    <td className="py-5 px-6">

                                        <span
                                            className={`
                        px-4 py-2 rounded-full
                        text-sm font-semibold
                        ${item.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : item.status === "Approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                      `}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="py-5 px-6">

                                        <div className="flex items-center gap-3">

                                            <button
                                                className="
                          h-10 px-4 rounded-xl
                          bg-green-500
                          text-white font-semibold
                          hover:bg-green-600
                          transition
                        "
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="
                          h-10 px-4 rounded-xl
                          bg-red-500
                          text-white font-semibold
                          hover:bg-red-600
                          transition
                        "
                                            >
                                                Reject
                                            </button>
                                        </div>
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