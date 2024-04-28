import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  let authenticated = authService.isAuthenticated();
  if(authenticated){
    return true;
  } else {
    router.navigate(['login'])
    return false;
  }
};
