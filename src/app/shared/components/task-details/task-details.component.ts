import { Component, Input } from '@angular/core';
import { Task } from '../../../core/task.model';
import { map, Observable, tap } from 'rxjs';
import { TasksService } from '../../../layout-navigation/services/tasks.service';

@Component({
    selector: 'task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
    @Input()
    public taskId: number | null = null;

    public get task() : Observable<Task> {
        return this._tasksService.tasksPull
            .pipe(
                map((tasks: Task[]) => {
                    return tasks.find((index : Task) => this.taskId === index.id) || new Task();
                })
            );
    }


    constructor(private _tasksService: TasksService) { }

    public changeCompleted() : void {
        this._tasksService.tasksPull
            .pipe(
                tap((tasks: Task[]) => {
                    const task : Task = tasks.find((index : Task) => this.taskId === index.id) || new Task();
                    task.isCompleted = !task.isCompleted;
                })
            );
    }
}
