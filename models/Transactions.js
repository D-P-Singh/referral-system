import mongoose from "mongoose";

const transactionSchema =
    new mongoose.Schema({

        user: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        amount: {

            type: Number,

            required: true,

        },

        type: {

            type: String,

            enum: [
                "credit",
                "debit",
            ],

            required: true,

        },

        source: {

            type: String,

            enum: [
                "referral",
                "referral_bonus",
                "daily_reward",
                "daily_referral_reward",
                "withdrawal",
                "payment",
                "bonus",
                "recharge",
                "refund",
            ],

            required: true,

        },
        utr: {
            type: String,
            sparse: true,
            unique: true,
        },

        status: {

            type: String,

            enum: [
                "pending",
                "success",
                "failed",
                "reject"
            ],

            default: "pending",

        },

        note: {
            type: String,
        },
        processedAt: {
            type: Date
        }

    }, {
        timestamps: true,
    });

export default mongoose.models.Transaction ||
    mongoose.model(
        "Transaction",
        transactionSchema
    );