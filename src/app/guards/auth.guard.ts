import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.loginStatus.pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {

        return router.createUrlTree(['/login']);
      }
    }),
  );
};
