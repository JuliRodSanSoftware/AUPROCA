import { Injectable, inject } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

Injectable({
  providedIn: 'root',
})
export const authGuard: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token-auproca');

  if (!token) {
    return redirectToSignIn(router);
  }

  const observable = new Observable<boolean | UrlTree>((observer) => {
    authService.isLoggedIn(token).subscribe({

      next: (data) =>{
          console.log("guard: "+ data.user_id);
          observer.next(true);
          observer.complete();
        },

      error: (error) => {
        console.error("guard: "+error);
          redirectToSignIn(router);
          observer.next(false);
          observer.complete();
        }
      },  
    );
  });

  return observable;
};

function redirectToSignIn(router: Router): UrlTree {
  router.navigate(['/sign-in']);
  return router.createUrlTree(['/sign-in']);
}
