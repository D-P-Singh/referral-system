"use client";

import { useEffect, useState } from "react";

export default function OffersCard() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetch("/api/user/offers")
            .then((res) => res.json())
            .then((data) => setOffers(data.offers || []));
    }, []);

    return (
        <div className="p-6 bg-gray-50 ">

            {/* HEADER */}
            <h1 className="text-3xl font-bold mb-6">
                🎁 Active Offers for You
            </h1>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {offers.map((offer) => (
                    <div
                        key={offer._id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 border"
                    >

                        {/* BANNER */}
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-lg">
                            {offer.title}
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 text-sm mb-3">
                            {offer.description}
                        </p>

                        {/* REWARD */}
                        <div className="bg-green-50 text-green-700 p-2 rounded mb-3 text-sm font-semibold">
                            🎁 Reward: {offer.reward?.type} {offer.reward?.value}
                        </div>

                        {/* CONDITIONS */}
                        <div className="text-xs text-gray-500 space-y-1">
                            {offer.conditions?.referralCount && (
                                <p>👥 Referrals: {offer.conditions.referralCount}</p>
                            )}

                            {offer.conditions?.minLevel && (
                                <p>📊 Min Level: {offer.conditions.minLevel}</p>
                            )}

                            {offer.conditions?.timeLimitDays && (
                                <p>⏳ Time: {offer.conditions.timeLimitDays} Days</p>
                            )}
                        </div>

                        {/* BUTTON */}
                        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
                            View Details
                        </button>

                    </div>
                ))}

            </div>
        </div>
    );
}