import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
    {
        // 🧑‍💼 BASIC INFO
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: String,

        banner: String, // UI me show karne ke liye image

        // 🎯 OFFER TYPE (display + logic tagging)
        type: {
            type: String,
            enum: [
                "REFERRAL",
                "RECHARGE",
                "TASK",
                "SIGNUP",
                "LEVEL",
                "CUSTOM"
            ],
            required: true,
        },

        // 💰 REWARD
        reward: {
            type: {
                type: String,
                enum: ["CASH", "BONUS", "PERCENT", "POINTS"],
                required: true,
            },
            value: {
                type: Number,
                required: true,
            },
        },

        // ⚙️ FLEXIBLE RULE ENGINE (IMPORTANT)
        conditions: {
            referralCount: Number,      // e.g. 10 referrals
            minLevel: Number,           // level requirement
            maxLevel: Number,

            minAmount: Number,          // recharge/task amount
            maxAmount: Number,

            timeLimitDays: Number,      // 7 days / 30 days

            isFirstOnly: {
                type: Boolean,
                default: false,
            },
        },

        // ⏰ VALIDITY
        startDate: Date,
        endDate: Date,

        // 📊 VISIBILITY CONTROL
        isActive: {
            type: Boolean,
            default: true,
        },

        // 🧑‍💼 ADMIN CONTROL
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        },

        // 🔥 PRIORITY (best offer choose karne ke liye future use)
        priority: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Offer ||
    mongoose.model("Offer", offerSchema);