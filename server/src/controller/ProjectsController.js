import { Project } from "../models/ProjectModel.js";
import { list, pick, str } from "../utils/sanitize.js";

const TEXT = ["title", "status", "category", "shortDescription", "businessProblem", "solution"];
const LISTS = ["requirements", "architecture", "technologies", "aiCapabilities", "engineeringFeatures", "challenges", "decisions", "results"];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const STATUSES = ["Completed", "In Progress"];

/** Whitelists and cleans the writable fields. Returns `{ data }` or `{ error }`. */
const clean = (body, { partial }) => {
    const raw = pick(body, [...TEXT, ...LISTS, "featured"]);
    const data = {};
    for (const k of TEXT) if (k in raw) data[k] = str(raw[k], k.length > 12 ? 4000 : 200);
    for (const k of LISTS) if (k in raw) data[k] = list(raw[k]);
    if ("featured" in raw) data.featured = raw.featured === true || raw.featured === "true";
    if (!partial) {
        for (const k of ["title", "category", "shortDescription"])
            if (!data[k]) return { error: `${k} is required` };
        data.status ||= "In Progress";
        data.featured ??= false;
    }
    if (data.title === "") return { error: "title is required" };
    if (data.status && !STATUSES.includes(data.status)) return { error: `status must be one of: ${STATUSES.join(", ")}` };
    return { data };
};

/** GET /api/projects[?category=…][&featured=true] – featured first, then oldest first. */
export const getProjects = async (req, res) => {
    const q = {};
    if (req.query.category) q.category = String(req.query.category);
    if (req.query.featured === "true") q.featured = true;
    res.json(await Project.find(q).sort({ featured: -1, createdAt: 1 }).lean());
};

/** GET /api/projects/:id */
export const getProjectByid = async (req, res) => {
    const project = await Project.findOne({ id: req.params.id }).lean();
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
};

/** POST /api/projects (admin) – `id` is the URL slug: lowercase letters, digits and dashes. */
export const createproject = async (req, res) => {
    const id = str(req.body?.id, 80).toLowerCase();
    if (!SLUG.test(id)) return res.status(400).json({ message: "id must be a slug like my-project (a-z, 0-9, dashes)" });
    const { data, error } = clean(req.body, { partial: false });
    if (error) return res.status(400).json({ message: error });
    res.status(201).json(await Project.create({ ...data, id }));
};

/** PUT /api/projects/:id (admin) – partial update; the id itself cannot change. */
export const updateProjectById = async (req, res) => {
    const { data, error } = clean(req.body, { partial: true });
    if (error) return res.status(400).json({ message: error });
    const project = await Project.findOneAndUpdate({ id: req.params.id }, data, { new: true, runValidators: true }).lean();
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
};

/** DELETE /api/projects/:id (admin) */
export const deleteById = async (req, res) => {
    const { deletedCount } = await Project.deleteOne({ id: req.params.id });
    if (!deletedCount) return res.status(404).json({ message: "Project not found" });
    res.status(204).end();
};
