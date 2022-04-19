import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { users } from './server-data/all-users.mock';
import { AuthenticationDataModel } from '../models/authentication-data.model';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class AuthServerService {
    private _allUsers : User[] = users;

    public registerUser(newUser: User) : void {
        console.log('данные на сервере');
        console.log(newUser);
        console.log('что лежит на сервере');
        console.log(this._allUsers);
        this._allUsers.push(newUser);
    }

    public getToken(data : AuthenticationDataModel) : Observable<string | null> {
        return new Observable<string | null>((sub :  Subscriber<string | null>) => {
            const user : User | undefined = this._allUsers.find(
                (u : User) => u.login === data.login || u.email === data.login
            );

            if (user !== undefined && user.password === data.password) {
                const requestBody : any = {
                    header: {
                        alg: 'HS256',
                        typ: 'JWT',
                    },
                    payload: {
                        login: user.login,
                        email: user.email,
                    }
                };

                sub.next('someAccessToken');
            } else {
                sub.next(null);
            }
        });
    }
}
