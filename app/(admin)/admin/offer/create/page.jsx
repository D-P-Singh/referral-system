"use client";

import { useState } from "react";

export default function CreateOffer() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        type: "REFERRAL",
        rewardType: "CASH",
        rewardValue: "",
        referralCount: "",
        minLevel: "",
        maxLevel: "",
        minAmount: "",
        maxAmount: "",
        timeLimitDays: "",
        isActive: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: form.title,
            description: form.description,
            type: form.type,

            reward: {
                type: form.rewardType,
                value: Number(form.rewardValue),
            },

            conditions: {
                referralCount: Number(form.referralCount) || null,
                minLevel: Number(form.minLevel) || null,
                maxLevel: Number(form.maxLevel) || null,
                minAmount: Number(form.minAmount) || null,
                maxAmount: Number(form.maxAmount) || null,
                timeLimitDays: Number(form.timeLimitDays) || null,
            },

            isActive: form.isActive,
        };

        const res = await fetch("/api/admin/offer/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log(data);
if(!data.success){
    alert(data.message)
    return
}
        alert("Offer Created 🚀");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl">

            <h1 className="text-2xl font-bold mb-6">
                🧑‍💼 Create New Offer
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* TITLE */}
                <input
                    name="title"
                    placeholder="Offer Title"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                {/* DESCRIPTION */}
                <textarea
                    name="description"
                    placeholder="Offer Description"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                />

                {/* TYPE */}
                <select
                    name="type"
                    className="w-full border p-3 rounded"
                    onChange={handleChange}
                >
                    <option value="REFERRAL">Referral</option>
                    <option value="RECHARGE">Recharge</option>
                    <option value="TASK">Task</option>
                    <option value="SIGNUP">Signup</option>
                    <option value="LEVEL">Level</option>
                    <option value="CUSTOM">Custom</option>
                </select>

                {/* REWARD */}
                <div className="grid grid-cols-2 gap-3">
                    <select
                        name="rewardType"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    >
                        <option value="CASH">Cash</option>
                        <option value="BONUS">Bonus</option>
                        <option value="PERCENT">Percent</option>
                        <option value="POINTS">Points</option>
                    </select>

                    <input
                        name="rewardValue"
                        placeholder="Reward Value"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />
                </div>

                {/* CONDITIONS */}
                <h2 className="font-bold mt-4">⚙️ Conditions</h2>

                <div className="grid grid-cols-2 gap-3">

                    <input
                        name="referralCount"
                        placeholder="Referral Count"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="minLevel"
                        placeholder="Min Level"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="maxLevel"
                        placeholder="Max Level"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="timeLimitDays"
                        placeholder="Time Limit (Days)"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="minAmount"
                        placeholder="Min Amount"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />

                    <input
                        name="maxAmount"
                        placeholder="Max Amount"
                        className="border p-3 rounded"
                        onChange={handleChange}
                    />
                </div>

                {/* ACTIVE */}
                <label className="flex items-center gap-2 mt-3">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                    />
                    Active Offer
                </label>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded mt-4 hover:bg-blue-700"
                >
                    🚀 Create Offer
                </button>

            </form>
        </div>
    );
}