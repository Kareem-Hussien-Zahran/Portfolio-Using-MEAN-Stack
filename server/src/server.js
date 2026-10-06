import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { requireAdmin } from "./middleware/auth.js";
import { errorHandler, notFound } from "./middleware/errors.js";
import { login, me } from "./controller/AuthController.js";
import { getProfile, updateProfile } from "./controller/ProfileController.js";
import { getProjects, getProjectByid, createproject, updateProjectById, deleteById } from "./controller/ProjectsController.js";
import { getAllSkills, createSkill, updateSkillById, deleteSkill } from "./controller/SkillsController.js";
import { getAllExperience, createExperience, updateExperienceById, deleteExperience } from "./controller/ExperienceController.js";
import { createContact, getMessages, setMessageRead, deleteMessage } from "./controller/ContactController.js";

const PORT = Number(process.env.PORT) || 3000;

if (!process.env.AUTH_SECRET || !process.env.ADMIN_PASSWORD) {
    console.error("Missing ADMIN_PASSWORD or AUTH_SECRET in server/.env – the dashboard login cannot work without them.");
    process.exit(1);
}

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json({ limit: "100kb" }));

/* ───────── auth ───────── */
app.post("/api/auth/login", login);
app.get("/api/auth/me", requireAdmin, me);

/* ───────── public reads / admin writes ───────── */
app.get("/api/profile", getProfile);
app.put("/api/profile", requireAdmin, updateProfile);

app.get("/api/projects", getProjects);
app.get("/api/projects/:id", getProjectByid);
app.post("/api/projects", requireAdmin, createproject);
app.put("/api/projects/:id", requireAdmin, updateProjectById);
app.delete("/api/projects/:id", requireAdmin, deleteById);

app.get("/api/skills", getAllSkills);
app.post("/api/skills", requireAdmin, createSkill);
app.put("/api/skills/:id", requireAdmin, updateSkillById);
app.delete("/api/skills/:id", requireAdmin, deleteSkill);

app.get("/api/experience", getAllExperience);
app.post("/api/experience", requireAdmin, createExperience);
app.put("/api/experience/:id", requireAdmin, updateExperienceById);
app.delete("/api/experience/:id", requireAdmin, deleteExperience);

/* ───────── contact: public submit, admin inbox ───────── */
app.post("/api/contact", createContact);
app.get("/api/contact", requireAdmin, getMessages);
app.patch("/api/contact/:id", requireAdmin, setMessageRead);
app.delete("/api/contact/:id", requireAdmin, deleteMessage);

app.use("/api", notFound);
app.use(errorHandler);

try {
    const db = await connectDB();
    console.log(`MongoDB connected: ${db.host} / ${db.name}`);
} catch (e) {
    console.error(e.message);
    process.exit(1);
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
