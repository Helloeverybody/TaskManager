import { Injectable } from '@angular/core';
import { AuthServerService } from './auth-server.service';

@Injectable()
export class AuthService {
    public token : string = '';

    constructor (private _server: AuthServerService) {

    }

    public registerUser() : void {

    }
}
