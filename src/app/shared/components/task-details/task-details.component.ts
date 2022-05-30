import { Component, Input } from '@angular/core';
import { Task } from '../../../core/task.model';
import { TasksService } from '../../../layout-navigation/services/tasks.service';

@Component({
    selector: 'task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
    @Input()
    public taskId: number | null = null;

    public task : Task = new Task();

    constructor(private _tasksService: TasksService) { }

    public getTask() : Task {
        if (!this.task || this.taskId !== this.task.id) {
            this._tasksService.getTasksPull()
                .subscribe((tasks: Task[]) => {
                    this.task = tasks.find((index: Task) => this.taskId === index.id) || new Task();
                });
        }

        return this.task;
    }

    public changeCompleteness() : void {
        this._tasksService.getTasksPull()
            .subscribe((tasks: Task[]) => {
                const task : Task = tasks.find((index : Task) => this.taskId === index.id) || new Task();
                task.isCompleted = !task.isCompleted;
            });
    }
}
