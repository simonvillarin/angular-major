import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const parentGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  if (user && JSON.parse(user).type === 'PARENT') {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/']);
    return false;
  }
};
