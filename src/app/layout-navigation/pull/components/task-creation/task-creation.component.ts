import { Component } from '@angular/core';
import { DialogInjection } from '../../../../core/global-services/dialogInjection';
import { ListsDataService } from '../../../services/lists-data.service';
import { Task } from '../../../../core/task.model';
import { TaskCreationViewModel } from '../../view-models/task-creation.view-moduel';
import { List } from '../../../../core/list.model';

@Component({
    selector: 'task-creation',
    templateUrl: './task-creation.component.html',
    styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent {
    public viewModel : TaskCreationViewModel = new TaskCreationViewModel()

    constructor (private _dialog: DialogInjection, private _listsData: ListsDataService) {  }

    public addTask () : void {
        const list : List | undefined = this._listsData.listsPull.find((item : List) => item.id  === this._dialog.parameter);
        const dateTime : Date = new Date(this.viewModel.newTaskForm.get('date')?.value + 'T' + this.viewModel.newTaskForm.get('time')?.value);
        if (list) {
            list.tasks.push(new Task(list.tasks.length + 1, this.viewModel.newTaskForm.value.title, this.viewModel.newTaskForm.value.description, this._dialog.parameter,
                dateTime, dateTime, this.viewModel.newTaskForm.value.repeat));
        }

        this._dialog.close();
    }

    public closeForm () : void {
        this._dialog.close();
    }
}
