import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}