import { Inject, Injectable } from '@angular/core';
import { Task } from '../../core/task.model';
import { map, Observable, Subscriber } from 'rxjs';
import { DataLoaderService } from './data-loader.service';
import { IDataLoader } from './dataLoaderInterface';

@Injectable()
export class TasksService {

    private _tasks: Task[] = [];

    constructor(
        @Inject('DataLoaderService')
        private _dataLoader: IDataLoader
    ) { }

    public getTasksPull() : Observable<Task[]> {
        if (this._dataLoader.areTasksLoaded) {
            return new Observable<Task[]>((sub : Subscriber<Task[]>) => {
                sub.next(this._tasks);
                sub.complete();
            });
        } else {
            return this._dataLoader.loadTasksData()
                .pipe(
                    map((tasks: Task[]) => {
                        if (this._dataLoader.areTasksLoaded) {
                            return this._tasks;
                        } else {
                            this._tasks.push(...tasks);
                            this._dataLoader.areTasksLoaded = true;
                        }

                        return this._tasks;
                    })
                );
        }
    }

    public addTask(task: Task) : void {
        this.getTasksPull()
            .subscribe((tasks : Task[]) => {
                task.id = tasks.length + 1;
                this._tasks.push(task);
            });
    }

    public clearData() : void {
        this._tasks = [];
        this._dataLoader.areTasksLoaded = false;
    }
}
