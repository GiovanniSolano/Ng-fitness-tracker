import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Store } from "@ngrx/store";

import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromRoot.State>){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
    
      return this.store.select(fromRoot.getIsAuth).pipe(take(1));
     
  }

  canLoad(route: Route): Observable<boolean>  {
    
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));

  }
  
}
