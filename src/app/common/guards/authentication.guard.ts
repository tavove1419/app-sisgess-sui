import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private _router: Router,
  ) {}

  canActivate() {
    if (sessionStorage.getItem('accessToken')) {
      return true;
    } else {
      this._router.navigateByUrl('');
      return false;
    }
  }

}
