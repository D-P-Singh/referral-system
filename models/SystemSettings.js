// models/SystemSettings.js

import mongoose from "mongoose";

const systemSettingsSchema = new mongoose.Schema(
    {
        minimumWithdraw: {
            type: Number,
            default: 100,
        },

        maximumWithdraw: {
            type: Number,
            default: 5000,
        },

        minimumDirectReferralForWithdraw: {
            type: Number,
            default: 2,
        },

        referralJoiningFee: {
            type: Number,
            default: 100,
        },

        dailyRewardAmount: {
            type: Number,
            default: 10,
        },

        withdrawChargePercent: {
            type: Number,
            default: 5,
        },

        withdrawEnabled: {
            type: Boolean,
            default: true,
        },

        referralEnabled: {
            type: Boolean,
            default: true,
        },

        maxLevels: {
            type: Number,
            default: 10,
        },

        accountActivationRequired: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.SystemSettings ||
    mongoose.model("SystemSettings", systemSettingsSchema);