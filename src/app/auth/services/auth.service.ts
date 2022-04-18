import { Injectable, Injector } from '@angular/core';
import { AuthServerService } from './auth-server.service';
import { User } from '../models/user';
import { RegistrationDataModel } from '../models/registration-data.model';
import { AuthenticationDataModel } from '../models/authentication-data.model';

@Injectable()
export class AuthService {
    public token : string = '';
    public server : AuthServerService;

    constructor (private _injector: Injector) {
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

    public authoriseUser(user: AuthenticationDataModel) : boolean {
        return true;
    }
}
