import { Component } from '@angular/core';
import { DialogInjection } from '../../../../core/global-services/dialogInjection';
import { ListDataService } from '../../../services/list-data.service';
import { Task } from '../../../../core/task.model';
import { TaskCreationViewModel } from '../../view-models/task-creation.view-moduel';

@Component({
    selector: 'task-creation',
    templateUrl: './task-creation.component.html',
    styleUrls: ['./task-creation.component.css'],
})
export class TaskCreationComponent {
    public viewModel : TaskCreationViewModel = new TaskCreationViewModel();

    constructor(private _dialog: DialogInjection, private _listsData: ListDataService) { }

    public addTask() : void {
        const dateTime : Date = new Date(
            `${this.viewModel.newTaskForm.get('date')?.value}T${this.viewModel.newTaskForm.get('time')?.value}`
        );
        const task : Task = new Task(
            this._listsData.tasksPull.length + 1,
            this.viewModel.newTaskForm.value.title,
            this.viewModel.newTaskForm.value.description,
            this._dialog.parameter,
            dateTime,
            dateTime,
            this.viewModel.newTaskForm.value.repeat,
        );
        this._listsData.addTask(task);

        this._dialog.close();
    }

    public closeForm() : void {
        this._dialog.close();
    }
}
