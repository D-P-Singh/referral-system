"use client";

import {
    FaBell,
    FaSearch,
    FaWallet,
    FaUsers,
} from "react-icons/fa";

export default function AdminNavbar() {

    return (
        <header
            className="
        w-full
        bg-white/70 backdrop-blur-xl
        border-b border-slate-200
        px-6 lg:px-8
        py-5
        sticky top-0 z-30
      "
        >
            <div
                className="
          flex flex-col lg:flex-row
          gap-5 lg:gap-0
          lg:items-center
          lg:justify-between
        "
            >
                {/* Left */}

                <div>

                    <h1
                        className="
              text-3xl font-black
              text-slate-900
            "
                    >
                        Admin Dashboard
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage users, rewards & referrals
                    </p>
                </div>

                {/* Right */}

                <div
                    className="
            flex flex-col sm:flex-row
            gap-4 sm:items-center
          "
                >
                    {/* Search */}

                    <div
                        className="
              relative
              w-full sm:w-[320px]
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
                            placeholder="Search users..."
                            className="
                w-full h-12
                pl-11 pr-4
                rounded-2xl
                border border-slate-200
                bg-white
                outline-none
                focus:ring-2
                focus:ring-cyan-500/30
              "
                        />
                    </div>

                    {/* Quick Stats */}

                    <div className="hidden xl:flex items-center gap-3">

                        <div
                            className="
                h-12 px-5 rounded-2xl
                bg-slate-900 text-white
                flex items-center gap-3
                shadow-lg
              "
                        >
                            <FaUsers />

                            <span className="font-semibold">
                                12.5K Users
                            </span>
                        </div>

                        <div
                            className="
                h-12 px-5 rounded-2xl
                bg-gradient-to-r from-cyan-500 to-blue-600
                text-white
                flex items-center gap-3
                shadow-lg
              "
                        >
                            <FaWallet />

                            <span className="font-semibold">
                                ₹2.4L Revenue
                            </span>
                        </div>
                    </div>

                    {/* Notification */}

                    <button
                        className="
              relative
              w-12 h-12
              rounded-2xl
              bg-white
              border border-slate-200
              flex items-center justify-center
              shadow-sm
              hover:bg-slate-50
              transition
            "
                    >
                        <FaBell className="text-slate-700" />

                        <span
                            className="
                absolute top-2 right-2
                w-2.5 h-2.5
                rounded-full
                bg-red-500
              "
                        />
                    </button>

                    {/* Admin Profile */}

                    <div
                        className="
              flex items-center gap-3
              bg-white
              border border-slate-200
              rounded-2xl
              px-3 py-2
              shadow-sm
            "
                    >
                        <img
                            src="https://i.pravatar.cc/100"
                            alt="admin"
                            className="
                w-11 h-11
                rounded-xl
                object-cover
              "
                        />

                        <div className="hidden sm:block">

                            <h3 className="font-bold text-slate-900">
                                Admin
                            </h3>

                            <p className="text-xs text-slate-500">
                                Super Admin
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}