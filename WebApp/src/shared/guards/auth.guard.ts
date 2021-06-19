import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/shared/services/data-storage.service';
import { AuthDao } from '../../shared/services/auth-dao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authDao: AuthDao, private router: Router, private dataStorageService: DataStorageService) {}

  /**
   * @param next The activatedroute
   * @param state The routerstate
   * @returns boolean If route can be accessed
   */
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.dataStorageService.getLoggedInUserId()) {
        return true;
      }
      else {
        this.router.navigate(['/']);
        return false;
      }
  }

}