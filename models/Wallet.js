import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        balance: {
            type: Number,
            default: 0,
        },

        totalEarned: {
            type: Number,
            default: 0,
        },

        totalWithdrawn: {
            type: Number,
            default: 0,
        },

        pendingWithdraw: {
            type: Number,
            default: 0,
        },

        lockedBalance: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Wallet ||
    mongoose.model("Wallet", walletSchema);