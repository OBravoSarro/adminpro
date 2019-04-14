import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/service.index';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _user: UserService, private _router: Router){}

  canActivate(): boolean {

    let resp = (this._user.user && this._user.user.hasOwnProperty('token') && this._user.user.token.length) ? true:false;

    if(!resp) {
      this._router.navigate(['/login']);
    }

    return resp;

  }
}
