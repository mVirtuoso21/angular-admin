import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class CanComponentActivateGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let loggedIn = JSON.parse(localStorage.getItem("loggedIn") ?? "false");
    if (!loggedIn) {
      return true;
    }
    else {
      this.router.navigate(['home']);
      return false;
    }
  }

}
