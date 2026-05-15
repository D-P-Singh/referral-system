"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
    FaBars,
    FaTimes,
    FaHome,
    FaUser,
    FaWallet,
    FaUsers,
    FaMoneyBillWave,
    FaCog,
    FaBell,
    FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import path from "path";
import { BookCheck } from "lucide-react";
import { useRouter } from "next/navigation";
const menuItems = [
    {
        name: "Dashboard",
        icon: <FaHome />,
        path: "/dashboard",
    },
    {
        name: "Profile",
        icon: <FaUser />,
        path: "/dashboard/profile",
    },
    {
        name: "Tasks",
        icon: <BookCheck />,
        path: "/dashboard/tasks",
    },
    {
        name: "Wallet",
        icon: <FaWallet />,
        path: "/dashboard/wallet",
    },
    {
        name: "Referrals",
        icon: <FaUsers />,
        path: "/dashboard/referrals",
    },
    {
        name: "Withdraw",
        icon: <FaMoneyBillWave />,
        path: "/dashboard/withdraw",
    },
    {
        name: "Recharge",
        icon: <FaMoneyBillWave />,
        path: "/dashboard/recharge",
    },
    {
        name: "Settings",
        icon: <FaCog />,
        path: "/dashboard/settings",
    },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const { user, wallet, totalReferrals } = useAuth();
    const router = useRouter();
    //console.log(user);
    const pathname = usePathname();
    const handleLogout = async () => {
        try {
            let res = await fetch("/api/auth/logout", {
                method: "POST",
            });
            res = await res.json();
            console.log(res)
            if (!res.success) {
                return;
            }
            router.push("/login"); // redirect to login
            router.refresh(); // refresh auth state
        } catch (error) {
            console.log("Logout error:", error);
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
                    className="
            fixed inset-0 bg-black/50 z-40 lg:hidden
          "
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-[290px]
          bg-white/80 backdrop-blur-2xl
          border-r border-slate-200
          shadow-2xl
          transition-all duration-300
          flex flex-col
          ${open
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"}
        `}
            >
                {/* Top Logo */}

                <div className="px-7 py-8 border-b border-slate-200">
                    <div className="flex items-center gap-4">
                        <div
                            className="
                w-14 h-14 rounded-2xl
                bg-gradient-to-r from-indigo-600 to-violet-600
                text-white font-black text-xl
                flex items-center justify-center
                shadow-lg
              "
                        >
                            S
                        </div>

                        <div>
                            <h1 className="text-2xl font-black text-slate-900">
                                User Hub
                            </h1>

                            <p className="text-sm text-slate-500 mt-1">
                                Referral & Rewards
                            </p>
                        </div>
                    </div>
                </div>

                {/* User Profile */}

                <div className="px-6 py-6">
                    <div
                        className="
              bg-gradient-to-r from-slate-900 to-slate-800
              rounded-3xl p-5 text-white
              shadow-xl
            "
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src="https://i.pravatar.cc/100"
                                alt="profile"
                                className="
                  w-14 h-14 rounded-2xl object-cover
                  border-2 border-white/20
                "
                            />

                            <div>
                                <h2 className="font-bold text-lg">
                                    {user?.name}
                                </h2>

                                <p className="text-sm text-slate-300">
                                    {user?.role === "user" ? "User Member" : "Admin"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="bg-white/10 rounded-2xl p-3">
                                <p className="text-xs text-slate-300">
                                    Wallet
                                </p>

                                <h3 className="text-lg font-bold mt-1">
                                    { wallet?.balance || "0"} Rs
                                </h3>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-3">
                                <p className="text-xs text-slate-300">
                                    Referrals
                                </p>

                                <h3 className="text-lg font-bold mt-1">
                                    {totalReferrals || "Loadding"}
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
                    group
                    ${active
                                            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        }
                  `}
                                >
                                    <span className="text-lg">
                                        {item.icon}
                                    </span>

                                    <span className="font-semibold">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom */}

                <div className="p-5 border-t border-slate-200">
                    <button onClick={() => { handleLogout() }}
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