import {
    Component,
    EventEmitter,
    Input,
    Output,
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

    @Output()
    public taskSelected : EventEmitter<number | null> = new EventEmitter<number | null>();

    public list!: HandleList;

    @Input()
    public set listId(id: number | null) {
        this.selectedTaskId = 0;
        this._listId = id;
        this.getList();
        this.getCompletedTasks();
    }

    private _listId: number | null = null;

    constructor(
        private _listsService: ListsService,
        private _tasksService: TasksService,
        private _overlay: DialogService
    ) {
        this.getList();
    }

    public onDragstart(event: DragEvent, id: number) : void {
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', id.toString());
        }
    }

    public onDragover(event: DragEvent) : void {
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move';
        }
    }

    public onDrop(event: DragEvent, targetId: number) : void {
        event.preventDefault();
        if (event.dataTransfer) {
            const startId : number = Number(event.dataTransfer.getData('text/plain'));
            const endId : number = targetId;
            if (startId !== endId) {
                this.changeOrder(startId, endId);
            }
        }
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
                    return tasks
                        .filter((task : Task) => task.listId === this.list?.id && task.isCompleted)
                        .sort((task1: Task, task2: Task) => task1.id - task2.id)
                        ?? new Array<Task>();
                })
            );
    }

    public getUncompletedTasks() : Observable<Task[]> {
        return this._tasksService.getTasksPull()
            .pipe(
                map((tasks: Task[]) => {
                    return tasks
                        .filter((task : Task) => task.listId === this.list?.id && !task.isCompleted)
                        .sort((task1: Task, task2: Task) => task1.id - task2.id)
                            ?? new Array<Task>();
                })
            );
    }

    public createNewTask() : void {
        this._overlay.open(TaskCreationComponent, this._listId);
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

    private changeOrder(startId: number, endId: number) : void {
        this.getUncompletedTasks().subscribe((tasks : Task[]) => {
            let lastId : number = startId;
            const startIndex : number = tasks.indexOf(tasks.find((task: Task) => task.id === startId) ?? new Task());
            const endIndex : number = tasks.indexOf(tasks.find((task: Task) => task.id === endId) ?? new Task());

            if (startIndex < endIndex) {
                for (let index : number = startIndex + 1; index < endIndex + 1; index++) {
                    const mId: number = tasks[index].id;
                    tasks[index].id = lastId;
                    lastId = mId;
                }
                tasks[startIndex].id = lastId;
            } else {
                tasks[startIndex].id = endId;
                for (let index : number = startIndex - 1; index >= endIndex; index--) {
                    const mId: number = tasks[index].id;
                    tasks[index].id = lastId;
                    lastId = mId;
                }
            }
        });
    }
}
