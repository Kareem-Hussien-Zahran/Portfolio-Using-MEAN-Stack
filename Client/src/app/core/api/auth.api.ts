import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { LoginResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);

  /** `POST /api/auth/login { password }` → `{ token, expiresIn }` (401 on a wrong password, 429 when rate-limited). */
  login(password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/auth/login`, { password });
  }

  /** `GET /api/auth/me` – succeeds only while the stored token is valid. */
  me(): Observable<{ role: string }> {
    return this.http.get<{ role: string }>(`${this.base}/auth/me`);
  }
}
