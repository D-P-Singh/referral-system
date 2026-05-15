"use client";

import {
    FaBell,
    FaSearch,
    FaMoon,
    FaSun,
    FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
    const {
        user,
        loading,
    } = useAuth();
    const [darkMode, setDarkMode] =
        useState(false);

    return (

        <header
            className="
        sticky top-0 z-30
        bg-white/80 backdrop-blur-2xl
        border-b border-slate-200
        px-4 sm:px-6 lg:px-8
        h-[80px]
        flex items-center justify-between
      "
        >

            {/* Left Side */}

            <div>

                <h1
                    className="
            text-2xl font-black
            text-slate-900
          "
                >
                    Dashboard 👋
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                    Welcome back, {user?.name}
                </p>

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-3 sm:gap-5">

                {/* Search Box */}

                <div
                    className="
            hidden md:flex
            items-center gap-3
            bg-slate-100
            px-4 h-12
            rounded-2xl
            min-w-[260px]
          "
                >

                    <FaSearch className="text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search here..."
                        className="
              bg-transparent
              outline-none
              w-full
              text-sm
            "
                    />

                </div>

                {/* Dark Mode */}

                <button
                    onClick={() =>
                        setDarkMode(!darkMode)
                    }
                    className="
            w-12 h-12
            rounded-2xl
            bg-slate-100
            flex items-center justify-center
            text-slate-700
            hover:bg-slate-200
            transition-all
          "
                >

                    {
                        darkMode
                            ? <FaSun />
                            : <FaMoon />
                    }

                </button>

                {/* Notification */}

                <button
                    className="
            relative
            w-12 h-12
            rounded-2xl
            bg-slate-100
            flex items-center justify-center
            text-slate-700
            hover:bg-slate-200
            transition-all
          "
                >

                    <FaBell />

                    <span
                        className="
              absolute top-2 right-2
              w-2.5 h-2.5
              bg-red-500 rounded-full
            "
                    />

                </button>

                {/* Profile */}

                <div
                    className="
            flex items-center gap-3
            bg-slate-100
            px-3 py-2
            rounded-2xl
            cursor-pointer
            hover:bg-slate-200
            transition-all
          "
                >

                    <img
                        src="https://i.pravatar.cc/100"
                        alt="profile"
                        className="
              w-11 h-11
              rounded-xl
              object-cover
            "
                    />

                    <div className="hidden sm:block">

                        <h3
                            className="
                text-sm font-bold
                text-slate-900
              "
                        >
                          {user?.name}
                        </h3>

                        <p
                            className="
                text-xs text-slate-500
              "
                        >
                            Mamber
                        </p>

                    </div>

                    <FaChevronDown
                        className="
              text-slate-500
              text-sm hidden sm:block
            "
                    />

                </div>

            </div>

        </header>
    );
}