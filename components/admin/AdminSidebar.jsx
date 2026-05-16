"use client";

import { icons, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import { useState } from "react";

import {
    FaBars,
    FaTimes,
    FaHome,
    FaUsers,
    FaWallet,
    FaMoneyBillWave,
    FaTasks,
    FaChartLine,
    FaCog,
    FaBell,
    FaSignOutAlt,
    FaUserShield,
    FaClipboardList,
    FaGift,
} from "react-icons/fa";

const menuItems = [
    {
        name: "Dashboard",
        icon: <FaHome />,
        path: "/admin",
    },
    {
        name: "Users",
        icon: <FaUsers />,
        path: "/admin/users",
    },
    {
        name: "Referrals",
        icon: <FaGift />,
        path: "/admin/referrals",
    },
    {
        name: "Recharge Request",
        icons: "",
        path: "/admin/recharge-requests"
    },
    {
        name: "Transactions",
        icon: <FaWallet />,
        path: "/admin/transactions",
    },
    {
        name: "Withdraw Requests",
        icon: <FaMoneyBillWave />,
        path: "/admin/withdraw-requests",
    },
    {
        name: "Wallet",
        icon: <Wallet />,
        path:"/admin/wallet"
    },
    {
        name: "Tasks",
        icon: <FaTasks />,
        path: "/admin/tasks",
    },
    {
        name: "Analytics",
        icon: <FaChartLine />,
        path: "/admin/analytics",
    },
    {
        name: "Notifications",
        icon: <FaBell />,
        path: "/admin/notifications",
    },
    {
        name: "Reports",
        icon: <FaClipboardList />,
        path: "/admin/reports",
    },
    {
        name: "Settings",
        icon: <FaCog />,
        path: "/admin/settings",
    },
];

export default function AdminSidebar() {

    const pathname = usePathname();

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleLogout = async () => {

        try {

            let res = await fetch("/api/auth/logout", {
                method: "POST",
            });

            res = await res.json();

            if (!res.success) return;

            router.push("/login");

            router.refresh();

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <>
            {/* Mobile Toggle */}

            <button
                onClick={() => setOpen(!open)}
                className="
          lg:hidden fixed top-5 left-5 z-[100]
          w-11 h-11 rounded-xl
          bg-white shadow-lg
          flex items-center justify-center
          text-slate-800
        "
            >
                {open ? <FaTimes /> : <FaBars />}
            </button>

            {/* Overlay */}

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="
            fixed inset-0 bg-black/50 z-40 lg:hidden
          "
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-[310px]
          bg-[#0F172A]
          border-r border-white/10
          shadow-2xl
          transition-all duration-300
          flex flex-col
          ${open
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
        `}
            >
                {/* Logo */}

                <div className="px-7 py-8 border-b border-white/10">

                    <div className="flex items-center gap-4">

                        <div
                            className="
                w-14 h-14 rounded-2xl
                bg-gradient-to-r from-cyan-500 to-blue-600
                flex items-center justify-center
                text-white text-2xl font-black
                shadow-lg
              "
                        >
                            A
                        </div>

                        <div>

                            <h1 className="text-2xl font-black text-white">
                                Admin Panel
                            </h1>

                            <p className="text-sm text-slate-400 mt-1">
                                Referral Management
                            </p>

                        </div>
                    </div>
                </div>

                {/* Admin Card */}

                <div className="px-5 py-6">

                    <div
                        className="
              rounded-3xl
              bg-gradient-to-br from-cyan-500 to-blue-600
              p-5 text-white shadow-xl
            "
                    >

                        <div className="flex items-center gap-4">

                            <div
                                className="
                  w-14 h-14 rounded-2xl
                  bg-white/20
                  flex items-center justify-center
                  text-2xl
                "
                            >
                                <FaUserShield />
                            </div>

                            <div>

                                <h2 className="font-bold text-lg">
                                    Admin Access
                                </h2>

                                <p className="text-sm text-cyan-100">
                                    Full System Control
                                </p>

                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-5">

                            <div className="bg-white/10 rounded-2xl p-3">

                                <p className="text-xs text-cyan-100">
                                    Total Users
                                </p>

                                <h3 className="text-xl font-black mt-1">
                                    12.5K
                                </h3>

                            </div>

                            <div className="bg-white/10 rounded-2xl p-3">

                                <p className="text-xs text-cyan-100">
                                    Revenue
                                </p>

                                <h3 className="text-xl font-black mt-1">
                                    ₹2.4L
                                </h3>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu */}

                <div className="flex-1 overflow-y-auto px-4 pb-6">

                    <div className="space-y-2">

                        {menuItems.map((item, index) => {

                            const active =
                                pathname === item.path;

                            return (
                                <Link
                                    key={index}
                                    href={item.path}
                                    onClick={() => setOpen(false)}
                                    className={`
                    flex items-center gap-4
                    px-5 py-4 rounded-2xl
                    transition-all duration-300
                    font-semibold
                    group
                    ${active
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                                        }
                  `}
                                >
                                    <span className="text-lg">
                                        {item.icon}
                                    </span>

                                    <span>
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom */}

                <div className="p-5 border-t border-white/10">

                    <button
                        onClick={handleLogout}
                        className="
              w-full h-14 rounded-2xl
              bg-gradient-to-r from-red-500 to-pink-500
              text-white font-bold
              flex items-center justify-center gap-3
              shadow-lg
              hover:scale-[1.02]
              transition-all duration-300
            "
                    >
                        <FaSignOutAlt />

                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}