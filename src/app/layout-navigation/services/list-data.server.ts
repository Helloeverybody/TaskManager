import { Injectable } from '@angular/core';
import { ilyaLists, sevaLists } from './data/lists-data.mock';
import { ilyaTasks, sevaTasks } from './data/tasksList.mock';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListDataServer {
    constructor(private _http: HttpClient) {  }

    public getListsData (token : string) : Observable<string | null> {
        const login : string = JSON.parse(atob(token)).login;

        return new Observable<string | null>((sub : Subscriber<string | null>) => {
            if (login === 'adeptus_cringus') {
                sub.next(JSON.stringify(sevaLists));
            } else if (login === 'ErmolaevID') {
                sub.next(JSON.stringify(ilyaLists));
            } else {
                sub.next(null);
            }
        });
    }

    public getTasksData (token : string) : Observable<any> {
        const login : string = JSON.parse(atob(token)).login;

        return new Observable<string | null>((sub : Subscriber<string | null>) => {
            if (login === 'adeptus_cringus') {
                sub.next(JSON.stringify(sevaTasks));
            } else if (login === 'ErmolaevID') {
                sub.next(JSON.stringify(ilyaTasks));
            } else {
                sub.next(null);
            }
        });
    }
}
