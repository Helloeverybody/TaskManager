import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../../global-services/authorizaton.service';

@Injectable()
export class AuthRedirectGuard implements CanActivate, CanActivateChild {
    private _authData : AuthorizationService;
    private _router : Router;

    constructor(private _injector: Injector) {
        this._authData = this._injector.get(AuthorizationService);
        this._router = this._injector.get(Router);
    }

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if(this._authData.checkToken()){
            this._router.navigate(['/app/pull']);
        }

        return true;
    }

    public canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.canActivate(next, state);
    }
}
