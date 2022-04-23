import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    private _token: string = '';

    public updateToken (value : string) : void {
        this._token = value;
    }

    public deleteToken () : void {
        this._token = '';
    }

    public checkToken () : boolean {
        // здесь должна быть отправка токена на сервер и авторизация
        return this._token !== '';
    }
}
