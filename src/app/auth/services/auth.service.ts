import { Injectable, Injector } from '@angular/core';
import { AuthServerService } from './auth-server.service';
import { RegistrationDataModel } from '../models/registration-data.model';
import { AuthenticationDataModel } from '../models/authentication-data.model';
import { AuthorizationService } from '../../global-services/authorizaton.service';

@Injectable()
export class AuthService {
    public server : AuthServerService;

    constructor (private _injector: Injector, private _auth: AuthorizationService) {
        this.server = this._injector.get(AuthServerService);
    }

    public registerUser(newUser: RegistrationDataModel) : void {
        this.server.registerUser({
            login: newUser.login,
            password: newUser.password,
            email: newUser.email,
            name: '',
            surname: ''
        });
    }

    public authoriseUser(userData: AuthenticationDataModel) : boolean {
        this.server.getToken(userData).subscribe((data : string | null) => {
            if (data !== null) {
                this._auth.updateToken(data);
            }
        });

        return this._auth.checkToken();
    }
}
