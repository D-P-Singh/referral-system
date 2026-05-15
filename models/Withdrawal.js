import mongoose from "mongoose";
const withdrawalSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    amount: Number,

    details: {
        type: Object,
        required: true,
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
    note: {
        type: String,
    },

}, {
    timestamps: true,
});

export default  mongoose.models.Withdrawal || mongoose.model(
        "Withdrawal",
        withdrawalSchema
    );