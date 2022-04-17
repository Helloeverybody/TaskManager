import { Component, Input } from '@angular/core';
import { ListDataService } from '../../../layout-navigation/services/list-data.service';
import { Task } from '../../../core/task.model';

@Component({
    selector: 'task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
    @Input()
    public taskId: number = -1;

    public get task() : Task {
        if (this._task.id !== this.taskId) {
            this._task = this._listsData.tasksPull.find((index : Task) => this.taskId === index.id) || new Task();
        }

        return this._task;
    }

    public set task(value: Task) {
        this._task = value;
    }

    private _task: Task = new Task();

    constructor(private _listsData: ListDataService) { }

    public getRepeatMode() : string {
        return RepeatMode[this._task.repeat];
    }

    public changeCompleted() : void {
        this._task.isCompleted = !this._task.isCompleted;
    }
}

enum RepeatMode{
    'без повтора',
    'каждый день',
    'каждую неделю',
    'каждый месяц',
    'каждый год'
}
