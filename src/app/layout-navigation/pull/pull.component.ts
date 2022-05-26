import { Component, OnInit } from '@angular/core';
import { ListCreationComponent } from './components/list-creation/list-creation.component';
import { DialogService } from '../../global-services/dialog.service';
import { HandleList } from './models/handleList.model';
import { Task } from '../../core/task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListsService } from '../services/lists.service';
import { IList } from './interfaces/list.interface';
import { TasksService } from '../services/tasks.service';
import { count, map, Observable } from 'rxjs';

@Component({
    selector: 'pull-component',
    templateUrl: './pull.component.html',
    styleUrls: ['./pull.component.css'],
})
export class PullComponent implements OnInit{
    public currentListId: number = 1;
    public currentTaskId: number | null = null;

    constructor(
        public listsService: ListsService,
        public tasksService: TasksService,
        private _overlay: DialogService,
        private _router: Router,
        private _route: ActivatedRoute) { }

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

    public getTasksCount(id: number) : Observable<number> {
        return this.tasksService.tasksPull
            .pipe(
                map((tasks: Task[]) => {
                    const uncompleted : Task[] = tasks.filter((task : Task) => task.listId === id && !task.isCompleted) ?? new Array<Task>();

                    return uncompleted.length;
                })
            );
    }

    private setNewPath() : void {
        this._router.navigate(['app/pull'],
            { queryParams: { listId: this.currentListId, taskId: this.currentTaskId } });
    }
}
