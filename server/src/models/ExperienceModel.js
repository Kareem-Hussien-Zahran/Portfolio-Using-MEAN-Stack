import mongoose from "mongoose";


const list = [String]

const ExperienceSchema = new mongoose.Schema(

    {
        period: String,
        title: String,
        org: String,
        description: String
    },
    { timestamps: true }


)

export const Experience = mongoose.model("Experience",ExperienceSchema);