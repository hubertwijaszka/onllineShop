import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
              private restService: RestService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (state.url === '/admin-users' ||
      state.url === 'admin-orders' || state.url === '/admin-products' || state.url === '/admin-add-product') {
      if (this.restService.isAdminCheck()) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }
    if (this.restService.isUserLoggedIn()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;

  }

}
