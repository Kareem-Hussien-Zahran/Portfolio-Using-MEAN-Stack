import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { Experience, ExperienceInput } from '../models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);

  /** `GET /api/experience` → all experience entries. */
  list(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.base}/experience`);
  }

  /** `POST /api/experience` (admin) */
  create(body: ExperienceInput): Observable<Experience> {
    return this.http.post<Experience>(`${this.base}/experience`, body);
  }

  /** `PUT /api/experience/:id` (admin) */
  update(id: string, body: Partial<ExperienceInput>): Observable<Experience> {
    return this.http.put<Experience>(`${this.base}/experience/${id}`, body);
  }

  /** `DELETE /api/experience/:id` (admin) → 204. */
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/experience/${id}`);
  }
}
