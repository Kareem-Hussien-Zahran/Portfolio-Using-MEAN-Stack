import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { Project, ProjectInput, ProjectQuery } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);

  /** `GET /api/projects[?category=…][&featured=true]` – featured projects are returned first. */
  list(query: ProjectQuery = {}): Observable<Project[]> {
    let params = new HttpParams();
    if (query.category) params = params.set('category', query.category);
    if (query.featured) params = params.set('featured', 'true');
    return this.http.get<Project[]>(`${this.base}/projects`, { params });
  }

  /** `GET /api/projects/:id` – responds `404 { message: "Project not found" }` for unknown ids. */
  getById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.base}/projects/${encodeURIComponent(id)}`);
  }

  /** `POST /api/projects` (admin) – 400 on invalid data, 409 when the id already exists. */
  create(body: ProjectInput): Observable<Project> {
    return this.http.post<Project>(`${this.base}/projects`, body);
  }

  /** `PUT /api/projects/:id` (admin) – partial update; the id itself cannot change. */
  update(id: string, body: Partial<ProjectInput>): Observable<Project> {
    return this.http.put<Project>(`${this.base}/projects/${encodeURIComponent(id)}`, body);
  }

  /** `DELETE /api/projects/:id` (admin) → 204. */
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/projects/${encodeURIComponent(id)}`);
  }
}
