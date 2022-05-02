import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { ListDataService } from '../../../services/list-data.service';
import { List } from '../../../../core/list.model';
import { DialogService } from '../../../../global-services/dialog.service';
import { Task } from '../../../../core/task.model';
import { TaskCreationComponent } from '../../../../shared/components/task-creation/task-creation.component';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})
export class ListComponent {
    public list : List = new List();

    public selectedTaskId : number = 0;

    @Output()
    public taskSelected : EventEmitter<number> = new EventEmitter<number>();

    public get completedTasks() : Task[] {
        return this._listsData.tasksPull.filter((item: Task) =>
            item.listId === this.list.id && item.isCompleted) ?? new Array<Task>();
    }

    public get uncompletedTasks() : Task[] {
        return this._listsData.tasksPull.filter((item: Task) =>
            item.listId === this.list.id && !item.isCompleted) ?? new Array<Task>();
    }

    @Input()
    public set listId(id: number) {
        this._listId = id;
        this.list = this._listsData.listsPull.find((item : List) => item.id === id) || new List();
        this.selectedTaskId = 0;
        this.selectTask(0);
    }

    private _listId: number = 0;

    constructor(private _listsData: ListDataService, private _overlay: DialogService) { }

    public createNewTask() : void {
        this._overlay.open(TaskCreationComponent, this._listId);
    }

    public makeCompleted(id: number) : void {
        const task : Task | undefined = this._listsData.tasksPull.find((item : Task) => item.id === id);
        if (task) {
            task.isCompleted = true;
        }
    }

    public makeUncompleted(id: number) : void {
        const task : Task | undefined = this._listsData.tasksPull.find((item : Task) => item.id === id);
        if (task) {
            task.isCompleted = false;
        }
    }

    public selectTask(id: number) : void {
        this.selectedTaskId = id;
        this.taskSelected.emit(id);
    }
}
