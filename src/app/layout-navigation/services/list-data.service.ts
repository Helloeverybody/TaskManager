import { Injectable } from '@angular/core';
import { List } from '../../core/list.model';
import { Task } from '../../core/task.model';
import { AuthorizationService } from '../../global-services/authorizaton.service';
import { ListDataServer } from './list-data.server';
import { Observable, Subscriber } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListDataService {
    private _lists : List[] = [];
    private _tasks : Task[] = [];

    public get listsPull() : List[] {
        return this._lists;
    }

    public get tasksPull() : Task[] {
        return this._tasks;
    }

    constructor(private _auth: AuthorizationService, private _server: ListDataServer) {
        this.loadData();
    }

    public addList(list: List) : void {
        list.id = this._lists.length + 1;
        this._lists.push(list);
    }

    public addTask(task: Task) : void {
        task.id = this.tasksPull.length + 1;
        this._tasks.push(task);
    }

    public loadData() : void {
        this.loadListsData().subscribe();
        this.loadTasksData().subscribe();
    }

    private loadListsData() : Observable<any> {
        return new Observable<any>((sub : Subscriber<any>) => {
            if (this._lists.length !== 0){
                sub.next();
                sub.complete();
            } else if (this._auth.token !== null) {
                this._server.getListsData(this._auth.token).subscribe(
                    (data : string | null) => {
                        if (data) {
                            JSON.parse(data).forEach((list: List) => {
                                this._lists.push(new List(
                                    list.title,
                                    list.id,
                                    list.color,
                                    list.isAuto,
                                    list.isDeletable
                                ));
                            });
                        } else {
                            console.log('Пользователь не был найден');
                        }
                        sub.next();
                    }
                );
            }
        });
    }

    private loadTasksData() : Observable<any> {
        return new Observable<any>((sub : Subscriber<any>) => {
            if (this._tasks.length !== 0){
                sub.next();
                sub.complete();
            } else if (this._auth.token !== null) {
                this._server.getTasksData(this._auth.token).subscribe(
                    (data : string | null) => {
                        if (data) {
                            JSON.parse(data).forEach((task: any) => {
                                this._tasks.push(new Task(
                                    task.id,
                                    task.title,
                                    task.description,
                                    task.listId,
                                    new Date(task.startDateTime),
                                    new Date(task.endDateTime),
                                    task.repeat
                                ));
                            });
                            console.log('loading ended');
                        } else {
                            console.log('Пользователь не был найден');
                        }
                        sub.next();
                    }
                );
            }
        });
    }
}
