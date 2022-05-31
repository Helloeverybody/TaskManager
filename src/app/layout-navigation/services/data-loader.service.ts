import { Injectable } from '@angular/core';
import { Task } from '../../core/task.model';
import { AuthorizationService } from '../../global-services/authorizaton.service';
import { map, Observable } from 'rxjs';
import { IList } from '../pull/interfaces/list.interface';
import { IListCreator } from '../pull/interfaces/listCreator.interface';
import { AutoListCreator } from '../pull/models/autoListCreator.model';
import { HandleListCreator } from '../pull/models/handleListCreator.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataLoaderService {
    public areListsLoaded : boolean = false;
    public areTasksLoaded : boolean = false;

    constructor(
        private _auth: AuthorizationService,
        private _http: HttpClient
    ) { }

    public loadListsData() : Observable<IList[]> {
        let url : string = '';

        if (this._auth.token === 'eyJsb2dpbiI6ImFkZXB0dXNfY3Jpbmd1cyIsImVtYWlsIjoic2V2YS5ib2NoYXJvdkBtYWlsLnJ1In0=') {
            url = 'http://localhost:3000/sevaLists';
        } else if (this._auth.token === 'eyJsb2dpbiI6IkVybW9sYWV2SUQiLCJlbWFpbCI6IkVybW9sYWV2LklEQHlhbmRleC5ydSJ9') {
            url = 'http://localhost:3000/ilyaLists';
        } else {
            url = 'http://localhost:3000/customLists';
        }

        if (this._auth.token !== null) {
            return this._http.get(url)
                .pipe(
                    map((data: any) => {
                        if (data) {
                            const lists: IList[] = [];

                            data.forEach((list: any) => {
                                const creator : IListCreator =
                                    list.hasOwnProperty('filters') ? new AutoListCreator() : new HandleListCreator();
                                lists.push(creator.listFromData(list));
                            });

                            return lists;
                        } else {
                            return [];
                        }
                    })
                );
        } else {
            return new Observable<IList[]>();
        }
    }

    public loadTasksData() : Observable<Task[]> {
        let url : string = 'http://localhost:3000/sevaTasks';

        if (this._auth.token === 'eyJsb2dpbiI6ImFkZXB0dXNfY3Jpbmd1cyIsImVtYWlsIjoic2V2YS5ib2NoYXJvdkBtYWlsLnJ1In0=') {
            url = 'http://localhost:3000/sevaTasks';
        } else if (this._auth.token === 'eyJsb2dpbiI6IkVybW9sYWV2SUQiLCJlbWFpbCI6IkVybW9sYWV2LklEQHlhbmRleC5ydSJ9') {
            url = 'http://localhost:3000/ilyaTasks';
        } else {
            url = 'http://localhost:3000/customTasks';
        }

        if (this._auth.token !== null) {
            return this._http.get(url)
                .pipe(
                    map((data : any) => {
                        if (data) {
                            const tasks : Task[] = [];
                            data.forEach((task: any) => {
                                tasks.push(new Task(
                                    task.id,
                                    task.title,
                                    task.description,
                                    task.listId,
                                    new Date(task.startDateTime),
                                    new Date(task.endDateTime),
                                    task.repeat
                                ));
                            });

                            return tasks;
                        } else {
                            return [];
                        }
                    })
                );
        } else {
            return new Observable<Task[]>();
        }
    }
}
