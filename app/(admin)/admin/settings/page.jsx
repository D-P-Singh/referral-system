"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        minimumWithdraw: 100,
        maximumWithdraw: 5000,
        referralReward: 20,
        activationValidityDays: 90,
        minimumDirectReferralForWithdraw: 2,
        referralJoiningFee: 100,
        dailyRewardAmount: 10,
        withdrawChargePercent: 5,
        withdrawEnabled: true,
        referralEnabled: true,
        maxLevels: 10,
        accountActivationRequired: true,
    });

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();

            if (data.success) {
                setFormData(data.settings);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? Number(value)
                        : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch("/api/admin/settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            alert(data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 px-5 outline-none focus:border-indigo-500";

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-4xl font-black text-slate-900">
                        System Settings
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage MLM referral, withdrawal and reward system.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                >
                    {/* LEFT */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm space-y-5">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Basic Settings
                        </h2>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                System Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Swadesi MLM"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Minimum Withdraw
                                </label>

                                <input
                                    type="number"
                                    name="minimumWithdraw"
                                    value={formData.minimumWithdraw}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Maximum Withdraw
                                </label>

                                <input
                                    type="number"
                                    name="maximumWithdraw"
                                    value={formData.maximumWithdraw}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Referral Reward
                                </label>

                                <input
                                    type="number"
                                    name="referralReward"
                                    value={formData.referralReward}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Daily Reward
                                </label>

                                <input
                                    type="number"
                                    name="dailyRewardAmount"
                                    value={formData.dailyRewardAmount}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Joining Fee
                                </label>

                                <input
                                    type="number"
                                    name="referralJoiningFee"
                                    value={formData.referralJoiningFee}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Withdraw Charge %
                                </label>

                                <input
                                    type="number"
                                    name="withdrawChargePercent"
                                    value={formData.withdrawChargePercent}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm space-y-5">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Advanced Controls
                        </h2>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Min Direct Referral
                                </label>

                                <input
                                    type="number"
                                    name="minimumDirectReferralForWithdraw"
                                    value={formData.minimumDirectReferralForWithdraw}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Max Levels
                                </label>

                                <input
                                    type="number"
                                    name="maxLevels"
                                    value={formData.maxLevels}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Activation Validity Days
                            </label>

                            <input
                                type="number"
                                name="activationValidityDays"
                                value={formData.activationValidityDays}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        {/* TOGGLES */}
                        <div className="space-y-4 pt-4">

                            <label className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-5">
                                <span className="font-medium">Withdraw Enabled</span>

                                <input
                                    type="checkbox"
                                    name="withdrawEnabled"
                                    checked={formData.withdrawEnabled}
                                    onChange={handleChange}
                                    className="w-5 h-5"
                                />
                            </label>

                            <label className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-5">
                                <span className="font-medium">Referral Enabled</span>

                                <input
                                    type="checkbox"
                                    name="referralEnabled"
                                    checked={formData.referralEnabled}
                                    onChange={handleChange}
                                    className="w-5 h-5"
                                />
                            </label>

                            <label className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-5">
                                <span className="font-medium">
                                    Account Activation Required
                                </span>

                                <input
                                    type="checkbox"
                                    name="accountActivationRequired"
                                    checked={formData.accountActivationRequired}
                                    onChange={handleChange}
                                    className="w-5 h-5"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-14 rounded-2xl text-white font-bold text-lg transition-all duration-300 ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:scale-[1.02]"
                                }`}
                        >
                            {loading ? "Updating..." : "Update Settings"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}