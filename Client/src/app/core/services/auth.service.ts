import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthApi } from '../api/auth.api';
import { LoginResponse } from '../models/auth.model';

const STORAGE_KEY = 'portfolio_admin_token';

/** Holds the admin token (persisted in localStorage) and exposes login / logout. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthApi);
  private readonly router = inject(Router);

  readonly token = signal<string | null>(this.read());
  readonly isLoggedIn = computed(() => !!this.token());

  login(password: string): Observable<LoginResponse> {
    return this.api.login(password).pipe(tap((res) => this.store(res.token)));
  }

  /** Clears the session. Pass `redirect = false` when the caller navigates itself. */
  logout(redirect = true): void {
    this.store(null);
    if (redirect) void this.router.navigate(['/admin/login']);
  }

  /** Asks the server whether the stored token is still valid; clears it when not. */
  verify(): Observable<boolean> {
    if (!this.token()) return of(false);
    return this.api.me().pipe(
      map(() => true),
      catchError(() => {
        this.store(null);
        return of(false);
      }),
    );
  }

  private store(token: string | null): void {
    this.token.set(token);
    try {
      if (token) localStorage.setItem(STORAGE_KEY, token);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable – keep the session in memory only */
    }
  }

  private read(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }
}
