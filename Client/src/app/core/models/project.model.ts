/** Mirrors `ProjectModel.js` on the server (`GET /api/projects`, `GET /api/projects/:id`). */
export interface Project {
  _id?: string;
  /** Human-readable unique key, also used as the URL slug (`/projects/:id`). */
  id: string;
  title: string;
  status: string; // "Completed" | "In Progress"
  category: string;
  featured: boolean;
  shortDescription: string;
  businessProblem: string;
  requirements: string[];
  solution: string;
  architecture: string[];
  technologies: string[];
  aiCapabilities: string[];
  engineeringFeatures: string[];
  challenges: string[];
  decisions: string[];
  results: string[];
  createdAt?: string;
  updatedAt?: string;
}

/** Query parameters supported by `GET /api/projects`. */
export interface ProjectQuery {
  category?: string;
  featured?: boolean;
}

/** Writable project fields (what the dashboard sends to POST / PUT). */
export type ProjectInput = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>;
