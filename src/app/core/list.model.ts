import { Task } from './task.model';
import { ListDataService } from '../layout-navigation/services/list-data.service';

export class List {
    public title: string;

    public id: number;

    public color: string;

    public isAuto: boolean;

    public isDeletable: boolean;

    constructor(title?: string, id?: number, color?: string, isAuto?: boolean, isDeletable?: boolean) {
        this.title = title || '';
        this.id = id || 0;
        this.color = color || '#000000';
        this.isAuto = isAuto || false;
        this.isDeletable = isDeletable || true;
    }

    public getAllTasks(data: ListDataService) : Task[] {
        return data.tasksPull.filter((item: Task) => item.listId === this.id) ?? new Array<Task>();
    }

    public getCompletedTasks(data: ListDataService) : Task[] {
        return data.tasksPull.filter((item: Task) => item.listId === this.id && item.isCompleted) ?? new Array<Task>();
    }

    public getUncompletedTasks(data: ListDataService) : Task[] {
        return data.tasksPull.filter((item: Task) => item.listId === this.id && !item.isCompleted) ?? new Array<Task>();
    }
}
