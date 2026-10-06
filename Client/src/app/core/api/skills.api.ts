import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { SkillGroupDto, SkillGroupInput } from '../models/skill-group.model';

@Injectable({ providedIn: 'root' })
export class SkillsApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);

  /** `GET /api/skills` → all skill groups. */
  list(): Observable<SkillGroupDto[]> {
    return this.http.get<SkillGroupDto[]>(`${this.base}/skills`);
  }

  /** `POST /api/skills` (admin) */
  create(body: SkillGroupInput): Observable<SkillGroupDto> {
    return this.http.post<SkillGroupDto>(`${this.base}/skills`, body);
  }

  /** `PUT /api/skills/:id` (admin) */
  update(id: string, body: Partial<SkillGroupInput>): Observable<SkillGroupDto> {
    return this.http.put<SkillGroupDto>(`${this.base}/skills/${id}`, body);
  }

  /** `DELETE /api/skills/:id` (admin) → 204. */
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/skills/${id}`);
  }
}
