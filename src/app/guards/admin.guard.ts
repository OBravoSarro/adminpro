import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { UserService } from "../services/user/user.service";

@Injectable({
    providedIn: "root"
})
export class AdminGuard implements CanActivate {
    constructor(private _user: UserService, private router: Router) {}

    canActivate(): boolean {
        if (
            this._user.user &&
            this._user.user.hasOwnProperty("user") &&
            this._user.user.user.hasOwnProperty("role") &&
            this._user.user.user.role === "ADMIN_ROLE"
        ) {
            return true;
        } else {
			this.router.navigate(['/dashboard']);
            return false;
        }
    }
}
