import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

/** Lets signed-in admins into /admin, otherwise redirects to the login page (remembering the target URL). */
export const adminGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  return inject(AuthService)
    .verify()
    .pipe(map((ok) => ok || router.createUrlTree(['/admin/login'], { queryParams: { returnUrl: state.url } })));
};
