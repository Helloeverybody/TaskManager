import { Injectable } from '@angular/core';
import { List } from '../../core/list.model';
import { lists } from './data/lists-data.mock';
import { Task } from '../../core/task.model';
import { tasks } from './data/tasksList.mock';

@Injectable({ providedIn: 'root' })
export class ListDataService {
    public get listsPull() : List[] {
        return lists;
    }

    public get tasksPull() : Task[] {
        return tasks;
    }

    constructor() { }

    public addList(list: List) : void {
        list.id = lists.length + 1;
        lists.push(list);
    }

    public addTask(task: Task) : void {
        tasks.push(task);
    }
}
