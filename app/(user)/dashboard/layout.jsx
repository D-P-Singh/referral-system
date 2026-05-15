"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
    children,
}) {

    const [openSidebar, setOpenSidebar] =
        useState(false);

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Mobile Overlay */}

            {
                openSidebar && (
                    <div
                        onClick={() => setOpenSidebar(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )
            }

            {/* Sidebar */}

            <div
                className={`
          fixed lg:static z-50 top-0 left-0 h-screen
          transition-transform duration-300
          ${openSidebar
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
        `}
            >
                <Sidebar />
            </div>

            {/* Main Content */}

            <div className="flex-1 flex flex-col w-full">

                <Navbar
                    setOpenSidebar={setOpenSidebar}
                />

                <main className="p-4 md:p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}