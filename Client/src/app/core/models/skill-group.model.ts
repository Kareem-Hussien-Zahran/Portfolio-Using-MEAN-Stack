/** Mirrors `SkillGroup.js` (`GET /api/skills`). */
export interface SkillGroupDto {
  _id: string;
  group: string;
  items: string[];
}

export type SkillGroupInput = Pick<SkillGroupDto, 'group' | 'items'>;
