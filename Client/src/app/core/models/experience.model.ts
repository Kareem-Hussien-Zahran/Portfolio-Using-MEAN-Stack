/** Mirrors `ExperienceModel.js` (`GET /api/experience`). */
export interface Experience {
  _id?: string;
  period: string;
  title: string;
  org: string;
  description: string;
}

export type ExperienceInput = Omit<Experience, '_id'>;
