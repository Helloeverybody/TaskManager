import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    private _token: string | null = null;

    constructor () {
        this._token = localStorage.getItem('token');
    }

    public get token() : string | null {
        return this._token;
    }

    public updateToken (value : string) : void {
        this._token = value;
        localStorage.setItem('token', value);
    }

    public deleteToken () : void {
        this._token = null;
        localStorage.removeItem('token');
    }

    public checkToken () : boolean {
        // здесь должна быть отправка токена на сервер и авторизация
        return this._token !== null;
    }
}
