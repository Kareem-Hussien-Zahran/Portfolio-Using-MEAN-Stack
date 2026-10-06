import { SkillGroup } from "../models/SkillGroup.js";
import { list, str } from "../utils/sanitize.js";

const clean = (body, { partial }) => {
    const data = {};
    if (!partial || "group" in (body ?? {})) {
        data.group = str(body?.group, 100);
        if (!data.group) return { error: "group is required" };
    }
    if (!partial || "items" in (body ?? {})) data.items = list(body?.items);
    return { data };
};

/** GET /api/skills */
export const getAllSkills = async (_req, res) => {
    res.json(await SkillGroup.find().sort({ createdAt: 1 }).lean());
};

/** POST /api/skills (admin) */
export const createSkill = async (req, res) => {
    const { data, error } = clean(req.body, { partial: false });
    if (error) return res.status(400).json({ message: error });
    res.status(201).json(await SkillGroup.create(data));
};

/** PUT /api/skills/:id (admin) */
export const updateSkillById = async (req, res) => {
    const { data, error } = clean(req.body, { partial: true });
    if (error) return res.status(400).json({ message: error });
    const skill = await SkillGroup.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).lean();
    if (!skill) return res.status(404).json({ message: "Skill group not found" });
    res.json(skill);
};

/** DELETE /api/skills/:id (admin) */
export const deleteSkill = async (req, res) => {
    const skill = await SkillGroup.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill group not found" });
    res.status(204).end();
};
