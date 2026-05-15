import mongoose from "mongoose";

const referralSchema =
    new mongoose.Schema({

        referrer: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        referredUser: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        rewardAmount: {

            type: Number,

            default: 20,

        },

        status: {

            type: String,

            enum: [
                "pending",
                "approved",
                "rejected",
            ],

            default: "pending",

        },

        paymentStatus: {

            type: String,

            enum: [
                "pending",
                "success",
            ],

            default: "pending",

        },

    }, {
        timestamps: true,
    });

export default mongoose.models.Referral ||
    mongoose.model(
        "Referral",
        referralSchema
    );