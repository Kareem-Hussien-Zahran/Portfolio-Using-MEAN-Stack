import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        subject: String,
        message: String,
        read: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export const ContactMessage = mongoose.model("ContactMessage", ContactMessageSchema);
