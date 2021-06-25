import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/shared/services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private dataStorageService: DataStorageService) {}

  /**
   * @param next The activatedroute
   * @param state The routerstate
   * @returns boolean If route can be accessed
   */
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const noAuthRequired = next.data.noAuthRequired;
      const isLoggedIn = this.dataStorageService.getLoggedInUserId() != null;

      if (isLoggedIn) {
        if (noAuthRequired) {
          this.router.navigate(['/ticket-overview']);
          return false;
        }
        return true;
      }
      else if (noAuthRequired) {
        return true;
      }
      else {
        this.router.navigate(['/']);
        return false;
      }
  }

}