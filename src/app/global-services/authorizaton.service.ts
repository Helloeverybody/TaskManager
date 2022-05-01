import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    private _token: string | null = null;

    public get token() : string | null {
        return this._token;
    }

    public updateToken (value : string) : void {
        this._token = value;
    }

    public deleteToken () : void {
        this._token = null;
    }

    public checkToken () : boolean {
        // здесь должна быть отправка токена на сервер и авторизация
        return this._token !== null;
    }
}
