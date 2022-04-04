import { Task } from '../../../../../core/task.model';

export class DateModel {
    public date: Date
    public isThisMonth: boolean
    public isToday: boolean
    public tasks: Task[]

    constructor (date: Date, isThisMonth: boolean, isToday: boolean) {
        this.date = date;
        this.isThisMonth = isThisMonth;
        this.isToday = isToday;
        this.tasks = new Array<Task>();
    }
}
