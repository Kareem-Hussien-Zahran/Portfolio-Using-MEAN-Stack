/** Mirrors `ProfileModel.js` (`GET /api/profile`). */
export interface Profile {
  _id?: string;
  name: string;
  role: string;
  email: string;
  linkedin: string;
  github: string;
  resume: string;
  summary?: string;
}
