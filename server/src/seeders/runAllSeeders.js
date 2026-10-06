import "dotenv/config";
import mongoose from "mongoose";

import { connectDB } from "../config/db.js";
import { Project } from "../models/ProjectModel.js";
import { SkillGroup } from "../models/SkillGroup.js";
import { Experience } from "../models/ExperienceModel.js";
import { Profile } from "../models/ProfileModel.js";

import { projects } from "./projectSeeder.js";
import { skills } from "./skillsSeeder.js";
import { experience } from "./experienceSeeder.js";
import { profile } from "./profileSeeder.js";

const force = process.argv.includes("--force");

try {
    const db = await connectDB();
    console.log(`Connected to ${db.host} / ${db.name}`);

    const existing = (await Promise.all([Project.countDocuments(), SkillGroup.countDocuments(), Experience.countDocuments(), Profile.countDocuments()]))
        .reduce((a, b) => a + b, 0);

    // The dashboard edits live data – never wipe it by accident.
    if (existing > 0 && !force) {
        console.error(`Database "${db.name}" already contains ${existing} documents.\nSeeding DELETES all projects, skills, experience and profile data (edits made in the dashboard would be lost).\nRun \`npm run seed -- --force\` if that is really what you want.`);
        process.exitCode = 1;
    } else {
        await Promise.all([Project.deleteMany({}), SkillGroup.deleteMany({}), Experience.deleteMany({}), Profile.deleteMany({})]);

        // insert in order so createdAt keeps the seed order
        for (const p of projects) await Project.create(p);
        for (const s of skills) await SkillGroup.create(s);
        for (const e of experience) await Experience.create(e);
        await Profile.create(profile);

        console.log(`Seed complete: ${projects.length} projects, ${skills.length} skill groups, ${experience.length} experience entries, 1 profile`);
    }
} catch (e) {
    console.error(e.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
