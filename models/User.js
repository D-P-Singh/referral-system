import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    phone: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    referralCode: {
        type: String,
        unique: true,
    },

    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },

    paymentStatus: {
        type: String,

        enum: [
            "pending",
            "success",
        ],

        default: "pending",
    },

    accountStatus: {

        type: String,

        enum: [
            "inactive",
            "active",
        ],

        default: "inactive",
    },
    completedTasks: [
        {
            taskId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
            },

            claimedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    isVerified: {
        type: Boolean,
        default: false,
    },
    totalReferrals: {
        type: Number,
        default: 0
    },

    isBlocked: {
        type: Boolean,
        default: false,
    },

    role: {

        type: String,

        enum: [
            "user",
            "admin",
        ],

        default: "user",
    },

}, {
    timestamps: true,
});

export default mongoose.models.User ||
    mongoose.model(
        "User",
        userSchema
    );