import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { AuthService } from '../services/auth.service';

/** Adds `Authorization: Bearer <token>` to API calls, and signs the user out when the token is rejected. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token();
  const isApi = req.url.startsWith(inject(API_BASE_URL));

  const outgoing = token && isApi ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(outgoing).pipe(
    catchError((err) => {
      if (err?.status === 401 && isApi && token && !req.url.endsWith('/auth/login')) auth.logout();
      return throwError(() => err);
    }),
  );
};
