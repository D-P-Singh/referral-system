
"use client";

import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import {
    Copy,
    IndianRupee,
    ShieldCheck,
    Wallet,
    CheckCircle2,
} from "lucide-react";

export default function RechargePage() {

    const [utr, setUtr] = useState("");
    const [loading, setLoading] = useState(false);

    const amount = 100;

    const upiId = "tdev7@ybl";
    const name = "Dev Pratap Singh";

    const upiLink =
        `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&tn=Wallet Recharge&cu=INR`;

const copyUpi = () => {

    navigator.clipboard.writeText(upiId);

    alert("UPI ID copied");
};

const handleRecharge = async () => {

    if (!utr) {

        alert("UTR number required");
        return;
    }

    setLoading(true);

    try {

        const res = await axios.post(
            "/api/user/recharge",
            {
                utr,
                price: amount,
            }
        );

        alert(res.data.message);

        setUtr("");

    } catch (err) {

        alert(
            err?.response?.data?.message ||
            "Recharge failed"
        );

    } finally {

        setLoading(false);
    }
};

return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 p-6">

            {/* TOP BADGE */}
            <div className="flex justify-center">

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">

                    <ShieldCheck size={16} />

                    Secure Recharge

                </div>

            </div>

            {/* HEADER */}
            <div className="text-center mt-5">

                <h1 className="text-3xl font-bold text-gray-900">
                    Wallet Recharge
                </h1>

                <p className="text-gray-500 text-sm mt-2">
                    Scan QR using any UPI app
                </p>

            </div>

            {/* AMOUNT CARD */}
            <div className="mt-6 bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-purple-600 rounded-3xl p-5 text-white shadow-lg">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm opacity-90">
                            Recharge Amount
                        </p>

                        <h2 className="text-4xl font-bold flex items-center mt-2">

                            <IndianRupee size={30} />

                            {amount}

                        </h2>

                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                        <Wallet size={28} />

                    </div>

                </div>

            </div>

            {/* QR CODE */}
            <div className="flex justify-center mt-7">

                <div className="bg-white border border-gray-200 p-4 rounded-3xl shadow-md">

                    <QRCode
                        value={upiLink}
                        size={220}
                    />

                </div>

            </div>

            {/* UPI BOX */}
            {/* <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-4">

                <p className="text-sm text-gray-500">
                    UPI ID
                </p>

                <div className="flex items-center justify-between mt-2">

                    <h2 className="font-semibold text-lg text-gray-800">
                        {upiId}
                    </h2>

                    <button
                        onClick={copyUpi}
                        className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
                    >

                        <Copy size={18} className="text-gray-700" />

                    </button>

                </div>

            </div> */}

            {/* INPUT */}
            <div className="mt-6">

                <label className="text-sm text-gray-700 font-medium">
                    Enter UTR / Transaction ID
                </label>

                <input
                    type="text"
                    placeholder="e.g. 123456789012"
                    className="w-full mt-2 h-14 px-4 rounded-2xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={utr}
                    onChange={(e) =>
                        setUtr(e.target.value)
                    }
                />

            </div>

            {/* BUTTON */}
            <button
                onClick={handleRecharge}
                disabled={loading}
                className="w-full mt-6 h-14 rounded-2xl bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-purple-600 text-white font-semibold text-lg shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70"
            >

                {loading
                    ? "Submitting..."
                    : "Submit Payment"}

            </button>

            {/* INFO BOX */}
            <div className="mt-5 flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-2xl p-4">

                <CheckCircle2 className="text-green-600 min-w-[20px]" />

                <div>

                    <p className="text-sm font-semibold text-gray-800">
                        Manual Verification
                    </p>

                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        After payment submission, admin will verify
                        your transaction and update wallet balance.
                    </p>

                </div>

            </div>

        </div>

    </div>
);
}
