import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { ListDataService } from '../../../services/list-data.service';
import { HandleList } from '../../models/handleList.model';
import { DialogService } from '../../../../global-services/dialog.service';
import { Task } from '../../../../core/task.model';
import { TaskCreationComponent } from '../../../../shared/components/task-creation/task-creation.component';
import { ListEditComponent } from '../list-edit/list-edit.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'handle-list',
    templateUrl: './handle-list.component.html',
    styleUrls: ['./handle-list.component.css'],
})
export class HandleListComponent {
    public list : HandleList = new HandleList();

    public selectedTaskId : number | null = null;

    @Output()
    public taskSelected : EventEmitter<number | null> = new EventEmitter<number | null>();

    public get completedTasks() : Task[] {
        return this._listsData.tasksPull.filter((item: Task) =>
            item.listId === this.list.id && item.isCompleted) ?? new Array<Task>();
    }

    public get uncompletedTasks() : Task[] {
        return this._listsData.tasksPull.filter((item: Task) =>
            item.listId === this.list.id && !item.isCompleted) ?? new Array<Task>();
    }

    @Input()
    public set listId(id: number | null) {
        this._listId = id;
        this.list = this._listsData.listsPull.find((item : HandleList) => item.id === id) || new HandleList();
        this.selectedTaskId = 0;
    }

    private _listId: number | null = null;

    constructor(private _listsData: ListDataService, private _overlay: DialogService) { }

    public createNewTask() : void {
        this._overlay.open(TaskCreationComponent, this._listId);
    }

    public editList() : void {
        this._overlay.open(ListEditComponent, this._listId);
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

    public selectTask(id: number | null) : void {
        this.selectedTaskId = id;
        this.taskSelected.emit(id);
    }
}
