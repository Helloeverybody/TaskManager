import { Component } from '@angular/core';
import { TaskCreationViewModel } from '../../view-models/task-creation.view-moduel';
import { DialogInjection } from '../../../core/global-services/dialogInjection';
import { ListDataService } from '../../../layout-navigation/services/list-data.service';

@Component({
    selector: 'task-creation',
    templateUrl: './task-creation.component.html',
    styleUrls: ['./task-creation.component.css'],
})
export class TaskCreationComponent {
    public viewModel : TaskCreationViewModel = new TaskCreationViewModel(this._dialog, this._listsData);

    constructor(private _dialog: DialogInjection, private _listsData: ListDataService) { }

    public addTask() : void {
        this.viewModel.addTask();
    }

    public closeForm() : void {
        this._dialog.close();
    }
}
