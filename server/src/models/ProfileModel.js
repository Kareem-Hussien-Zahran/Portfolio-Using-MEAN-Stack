import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
    {
        name: String,
        role: String,
        email: String,
        linkedin: String,
        github: String,
        resume: String,
        summary: String
    },
    { timestamps: true }
);

export const Profile = mongoose.model("Profile", ProfileSchema);
