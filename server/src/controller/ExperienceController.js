import { Experience } from "../models/ExperienceModel.js";
import { pick, str } from "../utils/sanitize.js";

const FIELDS = ["period", "title", "org", "description"];

const clean = (body, { partial }) => {
    const raw = pick(body, FIELDS);
    const data = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, str(v, k === "description" ? 2000 : 200)]));
    if (!partial) for (const k of ["title", "period"]) if (!data[k]) return { error: `${k} is required` };
    if ("title" in data && !data.title) return { error: "title is required" };
    return { data };
};

/** GET /api/experience – in insertion order. */
export const getAllExperience = async (_req, res) => {
    res.json(await Experience.find().sort({ createdAt: 1 }).lean());
};

/** POST /api/experience (admin) */
export const createExperience = async (req, res) => {
    const { data, error } = clean(req.body, { partial: false });
    if (error) return res.status(400).json({ message: error });
    res.status(201).json(await Experience.create(data));
};

/** PUT /api/experience/:id (admin) */
export const updateExperienceById = async (req, res) => {
    const { data, error } = clean(req.body, { partial: true });
    if (error) return res.status(400).json({ message: error });
    const item = await Experience.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).lean();
    if (!item) return res.status(404).json({ message: "Experience not found" });
    res.json(item);
};

/** DELETE /api/experience/:id (admin) */
export const deleteExperience = async (req, res) => {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Experience not found" });
    res.status(204).end();
};
