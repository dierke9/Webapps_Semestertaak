import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthguardService implements CanActivate {
  constructor(private serive: AuthenticationService, private route: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.serive.user$.getValue()) {
      return true;
    } else {
      this.serive.redirectURL = state.url;
      this.route.navigate(['/login']);
      return false;
    }
  }
}
