import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../../global-services/authorizaton.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    private _authModule : AuthorizationService;
    private _router : Router;

    constructor(private _injector: Injector) {
        this._authModule = this._injector.get(AuthorizationService);
        this._router = this._injector.get(Router);
    }

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (!this._authModule.checkToken()) {
            this._router.navigate(['/auth/authentication']);
        }

        return this._authModule.checkToken();
    }

    public canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.canActivate(next, state);
    }
}
