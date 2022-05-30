import { Injectable } from '@angular/core';
import { DateModel } from '../components/calendar/models/date-model';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../../core/task.model';

@Injectable()
export class MonthDatesService {
    public dateToday: Date = new Date();

    public currentMonth: Date = new Date(
        this.dateToday.getFullYear(),
        this.dateToday.getMonth(),
        1,
    );

    public firstDayOfMonth: number = 0;

    public lastDayOfMonth: number = 30;

    public prevLastDayOfMonth: number = 30;

    public monthTable: DateModel[][] = [];

    constructor(private _tasksService: TasksService) {
        this.recalculateDates();
    }

    public toNextMonth() : void {
        this.currentMonth = new Date(
            this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() + 1,
        );
        this.recalculateDates();
    }

    public toPreviousMonth() : void {
        this.currentMonth = new Date(
            this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() - 1,
        );
        this.recalculateDates();
    }

    public recalculateDates() : void {
        this.firstDayOfMonth = this.currentMonth.getDay();

        this.lastDayOfMonth = 33 - new Date(
            this.currentMonth.getFullYear(),
            this.currentMonth.getMonth(),
            33,
        ).getDate();

        this.prevLastDayOfMonth = 33 - new Date(
            this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() - 1,
            33,
        ).getDate();

        this._tasksService.getTasksPull()
            .subscribe((tasks: Task[]) => {
                this.recalculateTable(tasks);
            });
    }

    private recalculateTable(tasks: Task[]) : void {
        this.monthTable = [];

        let startDay : number = -this.currentMonth.getDay() + 2;

        // getDay() возвращает число, соответствующее дню недели, в диапазоне [1, 2, 3, 4, 5, 6, 0]
        // поэтому при 0 необходимо отнять 7 еще для правильных расчетов
        if (this.currentMonth.getDay() === 0) {
            startDay -= 7;
        }

        for (let i: number = 0; i <= 5; i++) {
            const line: DateModel[] = [];
            for (let j: number = 1; j <= 7; j++) {
                const date : Date = new Date(
                    this.currentMonth.getFullYear(),
                    this.currentMonth.getMonth(),
                    startDay
                );
                const isThisMonth : boolean = date.getMonth() === this.currentMonth.getMonth();
                const dateModel : DateModel = new DateModel(
                    date,
                    isThisMonth,
                    DateModel.areDatesEqual(date, new Date()),
                    tasks
                );
                startDay += 1;
                line.push(dateModel);
            }
            this.monthTable.push(line);
        }
        console.log(this.monthTable);
    }
}
