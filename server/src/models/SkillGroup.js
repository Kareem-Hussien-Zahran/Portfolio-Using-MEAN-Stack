
import mongoose from "mongoose";

const list = [String]

const SkillGroupSchema = new mongoose.Schema(
    {
        group: String,
        items: list
    },
    {
        timestamps: true
    }

)

export const SkillGroup = mongoose.model("SkillGroup", SkillGroupSchema);
