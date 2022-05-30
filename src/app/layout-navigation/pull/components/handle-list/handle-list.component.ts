import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChildren
} from '@angular/core';
import { HandleList } from '../../models/handleList.model';
import { DialogService } from '../../../../global-services/dialog.service';
import { Task } from '../../../../core/task.model';
import { TaskCreationComponent } from '../../../../shared/components/task-creation/task-creation.component';
import { ListEditComponent } from '../list-edit/list-edit.component';
import { map, Observable } from 'rxjs';
import { ListsService } from '../../../services/lists.service';
import { TasksService } from '../../../services/tasks.service';
import { IList } from '../../interfaces/list.interface';

@Component({
    selector: 'handle-list',
    templateUrl: './handle-list.component.html',
    styleUrls: ['./handle-list.component.css'],
})
export class HandleListComponent {
    public selectedTaskId : number | null = null;

    @ViewChildren('draggable')
    public listElements : ElementRef[] = [];

    @Output()
    public taskSelected : EventEmitter<number | null> = new EventEmitter<number | null>();

    public list!: HandleList;

    public completedTasks!: Task[];

    public uncompletedTasks!: Task[];

    @Input()
    public set listId(id: number | null) {
        this.selectedTaskId = 0;
        this._listId = id;
        this.getList();
        this.getCompletedTasks();
    }

    private _listId: number | null = null;

    constructor(private _listsService: ListsService, private _tasksService: TasksService, private _overlay: DialogService) {
        this.getList();
    }

    public getList() : void {
        this._listsService.getListsPull()
            .subscribe((lists: IList[]) => {
                this.list = lists.find((item : HandleList) => item.id === this._listId) ?? new HandleList();
            });
    }

    public getCompletedTasks() : Observable<Task[]> {
        return this._tasksService.getTasksPull()
            .pipe(
                map((tasks: Task[]) => {
                    return this.uncompletedTasks = tasks.filter((task : Task) => task.listId === this.list?.id && task.isCompleted) ?? new Array<Task>();
                })
            );
    }

    public getUncompletedTasks() : Observable<Task[]> {
        return this._tasksService.getTasksPull()
            .pipe(
                map((tasks: Task[]) => {
                    return this.uncompletedTasks = tasks.filter((task : Task) => task.listId === this.list?.id && !task.isCompleted) ?? new Array<Task>();
                })
            );
    }

    public createNewTask() : void {
        this._overlay.open(TaskCreationComponent, this._listId);
        console.log(this.listElements);
    }

    public editList() : void {
        this._overlay.open(ListEditComponent, this._listId);
    }

    public makeCompleted(id: number) : void {
        this._tasksService.getTasksPull()
            .subscribe((tasks: Task[]) => {
                const task : Task | undefined = tasks.find((item : Task) => item.id === id);
                if (task) {
                    task.isCompleted = true;
                }
            });
    }

    public makeUncompleted(id: number) : void {
        this._tasksService.getTasksPull()
            .subscribe((tasks: Task[]) => {
                const task : Task | undefined = tasks.find((item : Task) => item.id === id);
                if (task) {
                    task.isCompleted = false;
                }
            });
    }

    public selectTask(id: number | null) : void {
        this.selectedTaskId = id;
        this.taskSelected.emit(id);
    }
}
