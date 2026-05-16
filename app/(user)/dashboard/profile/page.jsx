"use client";

import { useEffect, useState } from "react";

import {
    FaEnvelope,
    FaPhone,
    FaUser,
    FaCalendarAlt,
    FaEdit,
    FaShieldAlt,
    FaSave,
    FaTimes,
    FaWallet,
    FaUsers,
} from "react-icons/fa";

export default function ProfilePage() {

    const [user, setUser] = useState({});

    const [isEditing, setIsEditing] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: "",
            phone: "",
            email:"",
        });

    // fetch profile
    useEffect(() => {

        fetch("/api/user/profile")
            .then((res) => res.json())
            .then((data) => {

                setUser(data.user);

                setFormData({
                    name: data.user?.name || "",
                    phone: data.user?.phone || "",
                    phone:data.user?.email||"",
                });
            });

    }, []);

    // handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // update profile
    const handleSave = async () => {

        try {

            setLoading(true);

            const res = await fetch(
                "/api/user/profile/update",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();

            if (data.success) {

                setUser(data.user);

                setIsEditing(false);
            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="space-y-8">

            {/* TOP PROFILE CARD */}

            <div
                className="
                relative overflow-hidden
                rounded-[25px]
               bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-purple-600
                p-8 lg:p-10
                shadow-2xl
                text-white
            "
            >

                {/* glow */}

                <div
                    className="
                    absolute
                    top-0 right-0
                     w-72 h-72
                    rounded-full
                    bg-violet-500/20
                    blur-3xl
                "
                />

                <div
                    className="
                    relative z-10
                    flex flex-col lg:flex-row
                    items-start lg:items-center
                    justify-between
                    gap-10
                "
                >

                    {/* LEFT */}

                    <div className="flex items-center gap-6">

                        {/* AVATAR */}

                        <div
                            className="
                            w-28 h-28
                            rounded-[32px]
                            bg-gradient-to-br
                            from-indigo-500
                            to-violet-600
                            flex items-center
                            justify-center
                            text-4xl
                            font-black
                            shadow-2xl
                            border border-white/10
                        "
                        >
                            {
                                user?.name?.charAt(0)
                            }
                        </div>

                        {/* USER INFO */}

                        <div>

                            <div className="flex items-center gap-3 flex-wrap">

                                {
                                    isEditing ? (

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="
                                                px-5 py-3
                                                rounded-2xl
                                                text-black
                                                text-2xl
                                                font-black
                                                outline-none
                                            "
                                        />

                                    ) : (

                                        <h1
                                            className="
                                            text-2xl
                                            lg:text-5xl
                                            font-black
                                        "
                                        >
                                            {user?.name}
                                        </h1>
                                    )
                                }

                                {
                                    user?.isVerified && (

                                        <div
                                            className="
                                            px-4 py-2
                                            rounded-2xl
                                            bg-emerald-500/20
                                            border border-emerald-400/20
                                            text-sm
                                            font-bold
                                            flex items-center gap-2
                                        "
                                        >
                                            <FaShieldAlt />

                                            Verified
                                        </div>
                                    )
                                }

                            </div>

                            <p
                                className="
                                mt-3
                                text-slate-300
                                text-lg
                            "
                            >
                                Premium Member
                            </p>

                            <div
                                className="
                                mt-6
                                flex flex-wrap
                                gap-4
                            "
                            >

                                <div
                                    className="
                                    px-5 py-3
                                    rounded-2xl
                                    bg-white/10
                                    border border-white/10
                                    backdrop-blur-xl
                                    text-sm
                                    font-semibold
                                    flex items-center gap-3
                                "
                                >
                                    <FaUsers />

                                    {user?.referralCode}
                                </div>

                                <div
                                    className="
                                    px-5 py-3
                                    rounded-2xl
                                    bg-white/10
                                    border border-white/10
                                    backdrop-blur-xl
                                    text-sm
                                    font-semibold
                                    flex items-center gap-3
                                "
                                >
                                    <FaWallet />

                                    ₹
                                    {user?.walletBalance || 0}
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex gap-3">

                        {
                            isEditing ? (

                                <>

                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="
                                            h-14 px-7
                                            rounded-2xl
                                            bg-emerald-500
                                            hover:bg-emerald-600
                                            transition-all
                                            font-bold
                                            flex items-center gap-3
                                            shadow-xl
                                        "
                                    >
                                        <FaSave />

                                        {
                                            loading
                                                ? "Saving..."
                                                : "Save"
                                        }
                                    </button>

                                    <button
                                        onClick={() =>
                                            setIsEditing(false)
                                        }
                                        className="
                                            h-14 px-7
                                            rounded-2xl
                                            bg-red-500
                                            hover:bg-red-600
                                            transition-all
                                            font-bold
                                            flex items-center gap-3
                                            shadow-xl
                                        "
                                    >
                                        <FaTimes />

                                        Cancel
                                    </button>

                                </>

                            ) : (

                                <button
                                    onClick={() =>
                                        setIsEditing(true)
                                    }
                                    className="
                                        h-14 px-7
                                        rounded-2xl
                                        bg-white
                                        text-slate-900
                                        font-bold
                                        flex items-center gap-3
                                        shadow-xl
                                        hover:scale-105
                                        transition-all
                                    "
                                >
                                    <FaEdit />

                                    Edit Profile
                                </button>
                            )
                        }

                    </div>

                </div>

            </div>

            {/* DETAILS SECTION */}

            <div
                className="
                grid
                lg:grid-cols-2
                gap-6
            "
            >

                {/* LEFT CARD */}

                <div
                    className="
                    bg-white
                    rounded-[32px]
                    p-8
                    shadow-xl
                    border border-slate-100
                "
                >

                    <div className="mb-8">

                        <h2
                            className="
                            text-3xl
                            font-black
                            text-slate-900
                        "
                        >
                            Personal Details
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Manage your profile information
                        </p>

                    </div>

                    <div className="space-y-6">

                        {/* NAME */}

                        <DetailCard
                            icon={<FaUser />}
                            title="Full Name"
                        >

                            {
                                isEditing ? (

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="
                                            w-full
                                            mt-3
                                            px-4 py-3
                                            rounded-2xl
                                            border
                                            outline-none
                                        "
                                    />

                                ) : (

                                    <h3
                                        className="
                                        text-xl
                                        font-black
                                        text-slate-900
                                        mt-2
                                    "
                                    >
                                        {user?.name || "-"}
                                    </h3>
                                )
                            }

                        </DetailCard>

                        {/* EMAIL */}

                        <DetailCard
                            icon={<FaEnvelope />}
                            title="Email Address"
                        >

                            <h3
                                className="
                                text-xl
                                font-black
                                text-slate-900
                                mt-2
                            "
                            >
                                {user?.email || "-"}
                            </h3>

                        </DetailCard>

                        {/* PHONE */}

                        <DetailCard
                            icon={<FaPhone />}
                            title="Phone Number"
                        >

                            {
                                isEditing ? (

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="
                                            w-full
                                            mt-3
                                            px-4 py-3
                                            rounded-2xl
                                            border
                                            outline-none
                                        "
                                    />

                                ) : (

                                    <h3
                                        className="
                                        text-xl
                                        font-black
                                        text-slate-900
                                        mt-2
                                    "
                                    >
                                        {user?.phone || "-"}
                                    </h3>
                                )
                            }

                        </DetailCard>

                        {/* JOINED */}

                        <DetailCard
                            icon={<FaCalendarAlt />}
                            title="Joined Date"
                        >

                            <h3
                                className="
                                text-xl
                                font-black
                                text-slate-900
                                mt-2
                            "
                            >
                                {
                                   user?.activatedAt || user?.createdAt
                                        ? new Date(
                                            user.createdAt
                                        ).toLocaleDateString()
                                        : "-"
                                }
                            </h3>

                        </DetailCard>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="space-y-6">

                    {/* WALLET */}

                    <div
                        className="
                        rounded-[32px]
                        bg-gradient-to-br
                        from-indigo-600
                        to-violet-700
                        p-8
                        text-white
                        shadow-2xl
                    "
                    >

                        <p className="text-indigo-100">
                            Wallet Balance
                        </p>

                        <h1
                            className="
                            text-5xl
                            font-black
                            mt-4
                        "
                        >
                            ₹
                            {user?.walletBalance || 0}
                        </h1>

                        <div
                            className="
                            mt-6
                            h-3
                            rounded-full
                            bg-white/20
                            overflow-hidden
                        "
                        >

                            <div
                                className="
                                h-full
                                w-[70%]
                                bg-white
                                rounded-full
                            "
                            />

                        </div>

                    </div>

                    {/* ACCOUNT STATUS */}

                    <div
                        className="
                        bg-white
                        rounded-[32px]
                        p-8
                        shadow-xl
                        border border-slate-100
                    "
                    >

                        <h2
                            className="
                            text-2xl
                            font-black
                            text-slate-900
                        "
                        >
                            Account Status
                        </h2>

                        <div className="mt-8 space-y-5">

                            <StatusBox
                                title="Verification"
                                value={
                                    user?.isVerified
                                        ? "Verified"
                                        : "Pending"
                                }
                            />

                            <StatusBox
                                title="Membership"
                                value="Premium Plan"
                            />

                            <StatusBox
                                title="Account"
                                value={
                                    user?.accountStatus ||
                                    "Active"
                                }
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

// =====================
// DETAIL CARD
// =====================

function DetailCard({
    icon,
    title,
    children,
}) {

    return (

        <div
            className="
            p-5
            rounded-3xl
            bg-slate-50
            border border-slate-100
        "
        >

            <div className="flex items-start gap-4">

                <div
                    className="
                    w-14 h-14
                    rounded-2xl
                    bg-indigo-100
                    text-indigo-600
                    flex items-center
                    justify-center
                    text-xl
                    shrink-0
                "
                >
                    {icon}
                </div>

                <div className="w-full">

                    <p className="text-slate-500">
                        {title}
                    </p>

                    {children}

                </div>

            </div>

        </div>
    );
}

// =====================
// STATUS BOX
// =====================

function StatusBox({
    title,
    value,
}) {

    return (

        <div
            className="
            p-5
            rounded-3xl
            bg-slate-50
            border border-slate-100
        "
        >

            <p className="text-slate-500">
                {title}
            </p>

            <h3
                className="
                text-xl
                font-black
                text-slate-900
                mt-2
            "
            >
                {value}
            </h3>

        </div>
    );
}