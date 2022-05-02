import { Component } from '@angular/core';
import { ListDataService } from '../services/list-data.service';
import { ListCreationComponent } from './components/list-creation/list-creation.component';
import { DialogService } from '../../global-services/dialog.service';
import { List } from '../../core/list.model';
import { Task } from '../../core/task.model';

@Component({
    selector: 'pull-component',
    templateUrl: './pull.component.html',
    styleUrls: ['./pull.component.css'],
})
export class PullComponent {
    public pull : List[] = [];
    public currentListId: number = 1;
    public currentTaskId: number = 0;

    constructor(public data: ListDataService, private _overlay: DialogService) {
        this.pull = data.listsPull;
    }

    public createNewList() : void {
        this._overlay.open(ListCreationComponent);
    }

    public editList() : void {
        this._overlay.open(ListCreationComponent);
    }

    public setCurrentList(index: number) : void {
        this.currentListId = index;
    }

    public onTaskSelected(taskId: number) : void {
        this.currentTaskId = taskId;
    }

    public getTasksCount(id: number) : number {
        return (this.data.tasksPull.filter((item: Task) => item.listId === id && !item.isCompleted) ?? new Array<Task>()).length;
    }
}
