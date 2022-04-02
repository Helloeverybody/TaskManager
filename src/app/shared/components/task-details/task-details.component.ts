import { Component, Input } from '@angular/core';
import { ListsDataService } from '../../../layout-navigation/services/lists-data.service';
import { Task } from '../../../core/task.model';
import { List } from '../../../core/list.model';

@Component({
    selector: 'task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
    @Input()
    public listId: number = 0
    @Input()
    public taskId: number = -1
    public get task () : Task {
        if (this._task.id !== this.taskId) {
            const list : List = this._listsData.listsPull.find((index : List) => this.listId === index.id) || new List();
            this._task = list.tasks.find((index : Task) => this.taskId === index.id) || new Task();
        }

        return this._task;
    }

    public set task (value: Task) {
        this._task = value;
    }
    private _task: Task = new Task()



    constructor (private _listsData: ListsDataService) { }

    public changeCompleted () : void {
        this._task.isCompleted = !this._task.isCompleted;
    }

    public getRepeatMode () : string {
        return RepeatMode[this.task.repeat];
    }
}

enum RepeatMode{
    'без повтора',
    'каждый день',
    'каждую неделю',
    'каждый месяц',
    'каждый год'
}
