import { Profile } from "../models/ProfileModel.js";
import { isEmail, pick, str } from "../utils/sanitize.js";

const FIELDS = ["name", "role", "email", "linkedin", "github", "resume", "summary"];

/** GET /api/profile – the single profile document, or null when none exists yet. */
export const getProfile = async (_req, res) => {
    res.json(await Profile.findOne().lean());
};

/** PUT /api/profile (admin) – updates the profile, creating it when missing. */
export const updateProfile = async (req, res) => {
    const data = Object.fromEntries(Object.entries(pick(req.body, FIELDS)).map(([k, v]) => [k, str(v, k === "summary" ? 1000 : 300)]));
    if ("name" in data && !data.name) return res.status(400).json({ message: "Name is required" });
    if (data.email && !isEmail(data.email)) return res.status(400).json({ message: "Invalid email" });
    const profile = await Profile.findOneAndUpdate({}, data, { new: true, upsert: true, runValidators: true }).lean();
    res.json(profile);
};
