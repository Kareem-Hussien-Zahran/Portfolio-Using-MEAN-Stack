import mongoose from "mongoose";

const list = [String];

const ProjectsSchema =new  mongoose.Schema(

    {
        id: {
            type: String,
            unique: true,
            index: true
        },
        title: String,
        status: String,
        category: String,
        featured: Boolean,
        shortDescription: String,
        businessProblem: String,
        requirements: list,
        solution: String,
        architecture: list,
        technologies: list,
        aiCapabilities: list,
        engineeringFeatures: list,
        challenges: list,
        decisions: list,
        results: list
    },
    { timestamps: true }

)

export const Project = mongoose.model("Project", ProjectsSchema);