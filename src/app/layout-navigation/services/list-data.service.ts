import { Injectable } from '@angular/core';
import { Task } from '../../core/task.model';
import { AuthorizationService } from '../../global-services/authorizaton.service';
import { ListDataServer } from './list-data.server';
import { Observable, Subscriber } from 'rxjs';
import { IList } from '../pull/interfaces/list.interface';
import { IListCreator } from '../pull/interfaces/listCreator.interface';
import { AutoListCreator } from '../pull/models/autoListCreator.model';
import { HandleListCreator } from '../pull/models/handleListCreator.model';

@Injectable({ providedIn: 'root' })
export class ListDataService {
    private _lists : IList[] = [];
    private _tasks : Task[] = [];

    public get listsPull() : IList[] {
        this.loadData();

        return this._lists;
    }

    public get tasksPull() : Task[] {
        this.loadData();

        return this._tasks;
    }

    constructor(private _auth: AuthorizationService, private _server: ListDataServer) { }

    public addList(list: IList) : void {
        list.id = this._lists.length + 1;
        this._lists.push(list);
    }

    public updateList(list: IList) : void {
        const index : number = this.listsPull.indexOf(list);
        this.listsPull.splice(index, 1, list);
    }

    public deleteList(list: IList) : void {
        const index : number = this.listsPull.indexOf(list);
        this.listsPull.splice(index, 1);
    }

    public addTask(task: Task) : void {
        task.id = this.tasksPull.length + 1;
        this._tasks.push(task);
    }

    public clearData() : void {
        this._lists = [];
        this._tasks = [];
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
                            const dataObject : any = JSON.parse(data);

                            dataObject.forEach((list: IList) => {
                                const creator : IListCreator =
                                    list.hasOwnProperty('filters') ? new AutoListCreator() : new HandleListCreator();
                                this._lists.push(creator.listFromData(list));
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
