import { CanActivate, CanActivateFn, Router} from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Authservice } from './authservice';


// @Injectable({
//   providedIn: 'root',
// })

export const authGuardGuard:CanActivateFn = () => {
  const router=inject(Router)
  const loggedIn = !!localStorage.getItem('token')
  if(loggedIn) return true
  return router.navigate(['/login'])

};


// export class authGuardGuard implements CanActivate {
//   constructor(private router:Router, private auth:Authservice,){}
//   canActivate(): boolean {
//     if(this.auth.IsLogged()) return true;
//     this.router.navigate(['/login']);
//     return false;
//   }

  
// };

