"use client";

import { useState } from "react";

import {
    User,
    Mail,
    Phone,
    Lock,
    Bell,
    Shield,
    Camera,
    Save,
} from "lucide-react";

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        name: "Dev Pratap Singh",
        email: "dev@example.com",
        phone: "+91 9876543210",
        password: "",
        confirmPassword: "",
    });

    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        rewards: true,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        alert("Settings updated successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Settings
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your account settings and preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border h-fit">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative">
                                <img
                                    src="https://i.pravatar.cc/150?img=12"
                                    alt="profile"
                                    className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
                                />

                                <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full">
                                    <Camera size={16} />
                                </button>
                            </div>

                            <h2 className="text-2xl font-bold mt-4 text-gray-800">
                                {formData.name}
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                Student Referral Partner
                            </p>

                            <div className="mt-6 w-full space-y-4">
                                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                                    <Mail className="text-gray-500" size={18} />

                                    <div className="text-left">
                                        <p className="text-xs text-gray-500">
                                            Email
                                        </p>
                                        <p className="text-sm font-medium text-gray-700 break-all">
                                            {formData.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                                    <Phone className="text-gray-500" size={18} />

                                    <div className="text-left">
                                        <p className="text-xs text-gray-500">
                                            Phone
                                        </p>
                                        <p className="text-sm font-medium text-gray-700">
                                            {formData.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Settings Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Info */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="bg-black text-white p-3 rounded-2xl">
                                    <User size={20} />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Personal Information
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Update your profile information
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={handleSave}
                                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>

                                    <div className="relative">
                                        <User
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border rounded-2xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border rounded-2xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>

                                    <div className="relative">
                                        <Phone
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full border rounded-2xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>

                                    <div className="relative">
                                        <Lock
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter new password"
                                            className="w-full border rounded-2xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:opacity-90 transition"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Notification Settings */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="bg-yellow-100 p-3 rounded-2xl">
                                    <Bell className="text-yellow-600" size={20} />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Notification Settings
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Manage notification preferences
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            Email Notifications
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Receive updates on email
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={notifications.email}
                                        onChange={() =>
                                            setNotifications({
                                                ...notifications,
                                                email: !notifications.email,
                                            })
                                        }
                                        className="w-5 h-5"
                                    />
                                </div>

                                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            SMS Notifications
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Receive SMS alerts and OTPs
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={notifications.sms}
                                        onChange={() =>
                                            setNotifications({
                                                ...notifications,
                                                sms: !notifications.sms,
                                            })
                                        }
                                        className="w-5 h-5"
                                    />
                                </div>

                                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            Reward Notifications
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Get notified when rewards are credited
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={notifications.rewards}
                                        onChange={() =>
                                            setNotifications({
                                                ...notifications,
                                                rewards: !notifications.rewards,
                                            })
                                        }
                                        className="w-5 h-5"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="bg-green-100 p-3 rounded-2xl">
                                    <Shield className="text-green-600" size={20} />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Security
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-1">
                                        Keep your account secure
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        Two-Factor Authentication
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Add extra protection to your account
                                    </p>
                                </div>

                                <button className="bg-black text-white px-5 py-2.5 rounded-2xl font-medium hover:opacity-90 transition">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
