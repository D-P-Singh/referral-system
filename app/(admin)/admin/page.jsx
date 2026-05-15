"use client";

import {
    FaUsers,
    FaWallet,
    FaMoneyBillWave,
    FaChartLine,
    FaArrowUp,
    FaArrowDown,
    FaUserCheck,
} from "react-icons/fa";

const stats = [
    {
        title: "Total Users",
        value: "12,540",
        icon: <FaUsers />,
        growth: "+12%",
    },
    {
        title: "Total Revenue",
        value: "₹2,45,000",
        icon: <FaWallet />,
        growth: "+18%",
    },
    {
        title: "Withdraw Requests",
        value: "58",
        icon: <FaMoneyBillWave />,
        growth: "-4%",
    },
    {
        title: "Active Referrals",
        value: "4,320",
        icon: <FaUserCheck />,
        growth: "+9%",
    },
];

const recentUsers = [
    {
        name: "Dev Pratap",
        email: "dev@example.com",
        amount: "₹540",
        status: "Active",
    },
    {
        name: "Aman Sharma",
        email: "aman@example.com",
        amount: "₹320",
        status: "Pending",
    },
    {
        name: "Rohit Kumar",
        email: "rohit@example.com",
        amount: "₹860",
        status: "Blocked",
    },
];

export default function AdminDashboardPage() {

    return (
        <div className="space-y-8">

            {/* Top Heading */}

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
                        Overview
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Monitor platform growth, rewards and activity.
                    </p>
                </div>

                <button
                    className="
            h-12 px-6 rounded-2xl
            bg-gradient-to-r from-cyan-500 to-blue-600
            text-white font-bold
            shadow-lg
            hover:scale-[1.02]
            transition-all duration-300
          "
                >
                    Generate Report
                </button>
            </div>

            {/* Stats Cards */}

            <div
                className="
          grid grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
            >
                {stats.map((item, index) => (

                    <div
                        key={index}
                        className="
              bg-white
              rounded-3xl
              p-6
              border border-slate-200
              shadow-sm
              hover:shadow-xl
              transition-all duration-300
            "
                    >
                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-slate-500 text-sm">
                                    {item.title}
                                </p>

                                <h2
                                    className="
                    text-3xl font-black
                    text-slate-900 mt-3
                  "
                                >
                                    {item.value}
                                </h2>
                            </div>

                            <div
                                className="
                  w-14 h-14 rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500 to-blue-600
                  text-white text-2xl
                  flex items-center justify-center
                  shadow-lg
                "
                            >
                                {item.icon}
                            </div>
                        </div>

                        <div className="mt-6">

                            <div
                                className={`
                  inline-flex items-center gap-2
                  px-3 py-1 rounded-full
                  text-sm font-semibold
                  ${item.growth.includes("+")
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }
                `}
                            >
                                {item.growth.includes("+")
                                    ? <FaArrowUp />
                                    : <FaArrowDown />
                                }

                                {item.growth}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analytics */}

            <div
                className="
          grid grid-cols-1
          xl:grid-cols-3
          gap-6
        "
            >
                {/* Chart */}

                <div
                    className="
            xl:col-span-2
            bg-white
            rounded-3xl
            border border-slate-200
            p-6
            shadow-sm
          "
                >
                    <div className="flex items-center justify-between">

                        <div>

                            <h2
                                className="
                  text-2xl font-black
                  text-slate-900
                "
                            >
                                Platform Analytics
                            </h2>

                            <p className="text-slate-500 mt-1">
                                Revenue & user growth
                            </p>
                        </div>

                        <div
                            className="
                h-11 px-4 rounded-2xl
                border border-slate-200
                flex items-center
              "
                        >
                            Last 30 Days
                        </div>
                    </div>

                    <div
                        className="
              h-[320px]
              mt-6
              rounded-3xl
              border border-dashed
              border-slate-300
              flex flex-col items-center justify-center
              text-slate-400
            "
                    >
                        <FaChartLine className="text-5xl" />

                        <p className="mt-4 text-lg font-medium">
                            Analytics Chart Area
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}

                <div
                    className="
            bg-white
            rounded-3xl
            border border-slate-200
            p-6
            shadow-sm
          "
                >
                    <h2
                        className="
              text-2xl font-black
              text-slate-900
            "
                    >
                        Quick Actions
                    </h2>

                    <div className="mt-6 space-y-4">

                        <button
                            className="
                w-full h-14 rounded-2xl
                bg-slate-900
                text-white font-bold
                hover:opacity-90
                transition
              "
                        >
                            Approve Withdrawals
                        </button>

                        <button
                            className="
                w-full h-14 rounded-2xl
                bg-gradient-to-r
                from-cyan-500 to-blue-600
                text-white font-bold
                hover:scale-[1.01]
                transition-all
              "
                        >
                            Send Reward Bonus
                        </button>

                        <button
                            className="
                w-full h-14 rounded-2xl
                border border-slate-200
                font-bold text-slate-700
                hover:bg-slate-50
                transition
              "
                        >
                            View Reports
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Users */}

            <div
                className="
          bg-white
          rounded-3xl
          border border-slate-200
          p-6
          shadow-sm
          overflow-x-auto
        "
            >
                <div
                    className="
            flex items-center justify-between
            mb-6
          "
                >
                    <div>

                        <h2
                            className="
                text-2xl font-black
                text-slate-900
              "
                        >
                            Recent Users
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Latest registered members
                        </p>
                    </div>

                    <button
                        className="
              h-11 px-5 rounded-2xl
              border border-slate-200
              hover:bg-slate-50
              transition
            "
                    >
                        View All
                    </button>
                </div>

                <table className="w-full min-w-[700px]">

                    <thead>

                        <tr className="border-b border-slate-200">

                            <th className="text-left py-4 text-slate-500">
                                User
                            </th>

                            <th className="text-left py-4 text-slate-500">
                                Earnings
                            </th>

                            <th className="text-left py-4 text-slate-500">
                                Status
                            </th>

                            <th className="text-left py-4 text-slate-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {recentUsers.map((user, index) => (

                            <tr
                                key={index}
                                className="
                  border-b border-slate-100
                  hover:bg-slate-50
                  transition
                "
                            >
                                <td className="py-5">

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
                                                {user.name}
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="py-5 font-bold text-slate-900">
                                    {user.amount}
                                </td>

                                <td className="py-5">

                                    <span
                                        className={`
                      px-4 py-2 rounded-full
                      text-sm font-semibold
                      ${user.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : user.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }
                    `}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                <td className="py-5">

                                    <button
                                        className="
                      h-10 px-5 rounded-xl
                      bg-slate-900
                      text-white font-semibold
                      hover:opacity-90
                      transition
                    "
                                    >
                                        View
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