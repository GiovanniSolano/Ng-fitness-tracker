import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    
      if(this.authService.isAuth()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }

  canLoad(route: Route): boolean  {
    
      if(this.authService.isAuth()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
