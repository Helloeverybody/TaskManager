import { Task } from '../../../../../core/task.model';

export class DateModel {
    public static areDatesEqual(date1: Date, date2: Date) : boolean {
        return date1.getDate() === date2.getDate()
            && date1.getMonth() === date2.getMonth()
            && date1.getFullYear() === date2.getFullYear();
    }

    /** Дата */
    public date: Date;

    /** В этом ли месяце эта дата */
    public isThisMonth: boolean;

    /** Сегодняшняя ли это дата */
    public isToday: boolean;

    public get tasks(): Task[] {
        return this.findTasks();
    }

    private _allTasks : Task[] = [];

    constructor(
        date: Date,
        isThisMonth: boolean,
        isToday: boolean,
        allTasksLink: Task[]
    ) {
        this.date = date;
        this.isThisMonth = isThisMonth;
        this.isToday = isToday;
        this._allTasks = allTasksLink;
    }

    private findTasks() : Task[] {
        return this._allTasks.filter(
            (item : Task) => DateModel.areDatesEqual(item.startDateTime, this.date)
                && !item.isCompleted
        );
    }
}
