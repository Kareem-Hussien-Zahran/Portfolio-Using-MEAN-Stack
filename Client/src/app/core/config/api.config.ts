import { InjectionToken } from '@angular/core';

/**
 * Base URL of the portfolio REST API.
 * Defaults to `/api` (proxied to the Express server in development, see proxy.conf.json).
 * Override in app.config.ts: `{ provide: API_BASE_URL, useValue: 'https://api.example.com/api' }`.
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => '/api',
});
