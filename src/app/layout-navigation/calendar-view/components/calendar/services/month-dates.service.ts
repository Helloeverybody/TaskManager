import { Injectable } from '@angular/core';
import { Task } from '../../../../../core/task.model';
import { List } from '../../../../../core/list.model';
import { ListDataService } from '../../../../services/list-data.service';
import { DateModel } from '../models/date-model';

@Injectable()
export class MonthDatesService {
    private static areDatesEqual (date1: Date, date2: Date) : boolean {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    }

    public dateToday: Date = new Date()
    public currentMonth: Date = new Date(this.dateToday.getFullYear(), this.dateToday.getMonth(), 1)
    public firstDayOfMonth: number = 0
    public lastDayOfMonth: number = 30
    public prevLastDayOfMonth: number = 30

    private _monthTable: DateModel[][] = []

    public get monthTable(): DateModel[][] {
        this.recalculateTable();

        return this._monthTable;
    }

    constructor(private _data: ListDataService) {
        this.recalculateDates();
    }

    public toNextMonth () : void {
        this.currentMonth = new Date(this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() + 1);
        this.recalculateDates();
    }

    public toPreviousMonth () : void {
        this.currentMonth = new Date(this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() - 1);
        this.recalculateDates();
    }

    private recalculateDates () : void {
        this.firstDayOfMonth = this.currentMonth.getDay();
        this.lastDayOfMonth = 33 - new Date(this.currentMonth.getFullYear(),
            this.currentMonth.getMonth(), 33).getDate();
        this.prevLastDayOfMonth = 33 - new Date(this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() - 1, 33).getDate();

        this.recalculateTable();
    }

    private recalculateTable () : void {
        this._monthTable = [];

        let startDay : number = -this.currentMonth.getDay() + 2;

        // getDay() возвращает число, соответствующее дню недели, в диапазоне [1, 2, 3, 4, 5, 6, 0]
        // поэтому при 0 необходимо отнять 7 еще для правильных расчетов
        if (this.currentMonth.getDay() === 0) {
            startDay -= 7;
        }

        for (let i: number = 0; i <= 5; i++) {
            const line: DateModel[] = [];
            for (let j: number = 1; j <= 7; j++) {
                const date : Date = new Date(this.currentMonth.getFullYear(),
                    this.currentMonth.getMonth(), startDay);
                const isThisMonth : boolean = date.getMonth() === this.currentMonth.getMonth();
                const dateModel : DateModel = new DateModel(date, isThisMonth, MonthDatesService.areDatesEqual(date, new Date()));
                dateModel.tasks = this.findTasks(date);
                startDay += 1;
                line.push(dateModel);
            }
            this._monthTable.push(line);
        }
    }

    private findTasks (date : Date) : Task[] {
        let tasks : Task[] = [];
        const lists : List[] = this._data.listsPull;
        for (let i : number = 0; i < lists.length; i++) {
            const newTasks : Task[] | undefined =
                lists[i].tasks.filter((item : Task) => MonthDatesService.areDatesEqual(item.startDateTime, date));
            tasks = tasks.concat(newTasks);
        }

        return tasks;
    }
}
