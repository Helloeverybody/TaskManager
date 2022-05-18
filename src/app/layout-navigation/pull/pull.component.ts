import { Component, OnInit } from '@angular/core';
import { ListDataService } from '../services/list-data.service';
import { ListCreationComponent } from './components/list-creation/list-creation.component';
import { DialogService } from '../../global-services/dialog.service';
import { HandleList } from './models/handleList.model';
import { Task } from '../../core/task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'pull-component',
    templateUrl: './pull.component.html',
    styleUrls: ['./pull.component.css'],
})
export class PullComponent implements OnInit{
    public pull : HandleList[] = [];
    public currentListId: number = 1;
    public currentTaskId: number | null = null;

    constructor(public data: ListDataService, private _overlay: DialogService, private _router: Router, private _route: ActivatedRoute) {
        this.pull = data.listsPull;
    }

    public ngOnInit (): void {
        this._route.queryParams.subscribe((params: Params) => {
            this.currentListId = Number(params['listId']) || 1;
            this.currentTaskId = Number(params['taskId']) || null;
        });
    }

    public createNewList() : void {
        this._overlay.open(ListCreationComponent);
    }

    public editList() : void {
        this._overlay.open(ListCreationComponent);
    }

    public setCurrentList(listId: number) : void {
        this.currentTaskId = null;
        this.currentListId = listId;
        this.setNewPath();
    }

    public onTaskSelected(taskId: number | null) : void {
        this.currentTaskId = taskId;
        this.setNewPath();
    }

    public getTasksCount(id: number) : number {
        return (this.data.tasksPull.filter((item: Task) => item.listId === id && !item.isCompleted) ?? new Array<Task>()).length;
    }

    private setNewPath() : void {
        this._router.navigate(['app/pull'],
            { queryParams: { listId: this.currentListId, taskId: this.currentTaskId } });
    }
}
