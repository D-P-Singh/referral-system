import mongoose from "mongoose";

const taskSchema =
    new mongoose.Schema({

        title: {
            type: String,
            required: true,
        },

        reward: {
            type: Number,
            default: 5,
        },

        order: {
            type: Number,
            required: true,
        },

        type: {
            type: String,
            enum: [
                "normal",
                "referral",
            ],
            default: "normal",
        },

        referralCount: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

    }, {
        timestamps: true,
    });

export default mongoose.models.Task ||
    mongoose.model(
        "Task",
        taskSchema
    );