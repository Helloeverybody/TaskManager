import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { users } from './server-data/all-users.mock';

@Injectable()
export class AuthServerService {
    private _allUsers : User[] = users;

    public registerUser(newUser: User) : void {
        this._allUsers.push(newUser);
    }
}
