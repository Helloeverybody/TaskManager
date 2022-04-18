import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { users } from './server-data/all-users.mock';

@Injectable()
export class AuthServerService {
    private _allUsers : User[] = users;
    private _secretWord : string = 'sevochka';

    public registerUser(newUser: User) : void {
        console.log('данные на сервере');
        console.log(newUser);
        console.log('что лежит на сервере');
        console.log(this._allUsers);
        this._allUsers.push(newUser);
    }

    public getToken() : string {
        return '';
    }
}
