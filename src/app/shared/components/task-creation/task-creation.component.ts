import { Component } from '@angular/core';
import { TaskCreationViewModel } from '../../view-models/task-creation.view-model';
import { DialogInjection } from '../../../global-services/dialogInjection';
import { Task } from '../../../core/task.model';
import { TasksService } from '../../../layout-navigation/services/tasks.service';

@Component({
    selector: 'task-creation',
    templateUrl: './task-creation.component.html',
    styleUrls: ['./task-creation.component.css'],
})
export class TaskCreationComponent {
    public viewModel : TaskCreationViewModel = new TaskCreationViewModel(this._dialog.parameter);

    constructor(private _dialog: DialogInjection, private _tasksService: TasksService) { }

    public closeForm() : void {
        this._dialog.close();
    }

    public submit(): void {
        const model: Task = this.viewModel.toModel();
        this._tasksService.addTask(model);

        this._dialog.close();
    }
}
