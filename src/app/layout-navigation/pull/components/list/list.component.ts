import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListDataService } from '../../../services/list-data.service';
import { List } from '../../../../core/list.model';
import { DialogService } from '../../../../core/global-services/dialog.service';
import { TaskCreationComponent } from '../task-creation/task-creation.component';
import { Task } from '../../../../core/task.model';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    public list : List = new List()
    public selectedTaskId : number = 0

    @Output()
    public taskSelected : EventEmitter<number> = new EventEmitter<number>();

    public get completedTasks() : Task[] {
        return this.list.tasks.filter((item : Task) => item.isCompleted);
    }

    public get uncompletedTasks() : Task[] {
        return this.list.tasks.filter((item : Task) => !item.isCompleted);
    }

    @Input()
    public set listId(id: number) {
        this._listId = id;
        this.list = this._listsData.listsPull.find((item : List) => item.id === id) || new List;
        this.selectedTaskId = 0;
        this.selectTask(0);
    }

    private _listId: number = 0

    constructor(private _listsData: ListDataService, private _overlay: DialogService) { }

    public createNewTask () : void {
        this._overlay.open(TaskCreationComponent, this._listId);
    }

    public makeCompleted (id: number) : void {
        const task : Task | undefined = this.list.tasks.find((item : Task) => item.id === id);
        if (task) {
            task.isCompleted = true;
        }
    }

    public makeUncompleted (id: number) : void {
        const task : Task | undefined = this.list.tasks.find((item : Task) => item.id === id);
        if (task) {
            task.isCompleted = false;
        }
    }

    public selectTask (id: number) : void  {
        this.selectedTaskId = id;
        this.taskSelected.emit(id);
    }
}
