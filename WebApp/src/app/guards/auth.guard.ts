import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthDao } from '../../shared/services/auth-dao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authDao: AuthDao) {}

  /**
   * @param next The activatedroute
   * @param state The routerstate
   * @returns boolean If route can be accessed
   */
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authDao.isLoggedIn()) {
        return true;
      }
      window.alert('You need to be logged in to view this page');
      return false;
  }

}