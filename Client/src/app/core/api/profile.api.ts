import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);

  /** `GET /api/profile` → the single profile document (or `null` when none is seeded). */
  get(): Observable<Profile | null> {
    return this.http.get<Profile | null>(`${this.base}/profile`);
  }

  /** `PUT /api/profile` (admin) – updates, or creates when missing. */
  update(body: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>(`${this.base}/profile`, body);
  }
}
