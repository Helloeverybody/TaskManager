import { Injectable } from '@angular/core';
import { DateModel } from '../components/calendar/models/date-model';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../../core/task.model';
import * as dns from 'dns';
import { getMaxNumberOfWorkers } from '@angular/compiler-cli/ngcc/src/ngcc_options';

@Injectable()
export class MonthDatesService {
    /** Сегодняшний день */
    public dateToday: Date = new Date();

    /** Текущий месяц */
    public currentMonth: Date = new Date(
        this.dateToday.getFullYear(),
        this.dateToday.getMonth(),
        1,
    );

    /** Первый день месяца */
    public firstDayOfMonth: number = 0;

    /** Последний день месяца */
    public lastDayOfMonth: number = 30;

    /** ХЗ */
    public prevLastDayOfMonth: number = 30;

    /** Ублюдский двумерный массив дат, обозначает таблицу */
    public monthTable: DateModel[][] = [];

    constructor(private _tasksService: TasksService) {
        this.recalculateDates();
    }

    /** Переход к следующему месяцу */
    public toNextMonth() : void {
        this.currentMonth = new Date(
            this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() + 1,
        );
        this.recalculateDates();
    }

    /** Переход к предыдущему месяцу */
    public toPreviousMonth() : void {
        this.currentMonth = new Date(
            this.currentMonth.getFullYear(),
            this.currentMonth.getMonth() - 1,
        );
        this.recalculateDates();
    }

    /** Перерасчет всех ключевых дат, поиск тасок для отрисовки и перерасчет всей таблицы */
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

    /** Перерасчет таблицы */
    private recalculateTable(tasks: Task[]): void {
        this.monthTable = [];

        const wtf: number = 2;

        let firstDayOfTable: number = -this.currentMonth.getDay() + wtf;

        // пн 1
        // вт 0
        // ср -1
        // чт -2
        // пт -3
        // сб -4
        // вс -5


        // getDay() возвращает число, соответствующее дню недели, в диапазоне [1, 2, 3, 4, 5, 6, 0]
        // поэтому при 0 необходимо отнять 7 еще для правильных расчетов
        if (this.currentMonth.getDay() === 0) {
            firstDayOfTable -= 7;
        }

        for (let i: number = 0; i <= 5; i++) {
            const line: DateModel[] = [];
            for (let j: number = 1; j <= 7; j++) {
                const date : Date = new Date(
                    this.currentMonth.getFullYear(),
                    this.currentMonth.getMonth(),
                    firstDayOfTable
                );
                const isThisMonth: boolean = date.getMonth() === this.currentMonth.getMonth();
                const dateModel: DateModel = new DateModel(
                    date,
                    isThisMonth,
                    DateModel.areDatesEqual(date, new Date()),
                    tasks
                );
                firstDayOfTable += 1;
                line.push(dateModel);
            }
            this.monthTable.push(line);
        }
    }

    /** Генерация таблицы */
    private createDatesTable(firstDateOfCurrentMonth: Date): Date[][] {
        const table: Date[][] = [];

        const tableWidth: number = 7;
        const tableHeight: number = 5;

        const firstDateOfTable: Date = this.getFirstDateOfMonthTable(firstDateOfCurrentMonth);
        const lastDateOfTable: Date = new Date(
            firstDateOfTable.getFullYear(),
            firstDateOfTable.getMonth(),
            firstDateOfTable.getDate() + tableWidth * tableHeight
        );

        const linearTable: Date[] = this.getDateArrayFromTo(firstDateOfTable, lastDateOfTable)

        for (let i: number = 0; i <= tableHeight; i++) {
            const line: Date [] = linearTable.slice(i * tableWidth, i + tableWidth - 1)
            table.push(line);
        }

        return table;
    }

    public millisecondsInDay = 1000 * 60 * 60 * 24;

    /**
     * Вoзвращает список дат между двумя другими датами (обе включительно)
     * */
    public getDateArrayFromTo(fromDate: Date, toDate: Date): Date[] {
        return Array.from(
            Array(this.getDaysBetweenDates(fromDate, toDate)).keys(),
            (daysToAdd: number) => {
                return this.addDaysTo(fromDate, daysToAdd);
            }
        );
    }

    /**
     * Вычисляет количество дней между датами
     * */
    // вернет отрицательное значение, если первая дата будет больше второй
    public getDaysBetweenDates(first: Date, second: Date): number {
        const clonedFirst: Date = new Date(first);
        const clonedSecond: Date = new Date(second);

        clonedFirst.setMilliseconds(0);
        clonedFirst.setSeconds(0);
        clonedFirst.setMinutes(0);

        clonedSecond.setMilliseconds(0);
        clonedSecond.setSeconds(0);
        clonedSecond.setMinutes(0);

        return (clonedFirst.getTime() - clonedSecond.getTime()) / this.millisecondsInDay;
    }

    /**
     * Добавляет указанное количество дней к дате
     * */
    public addDaysTo(date: Date, daysCount: number): Date {
        const clonedDate: Date = new Date(date);
        clonedDate.setDate(date.getDate() + daysCount);

        return clonedDate;
    }

    /**
     * Вычисляет первый день в таблице дней месяца на основе первого числа заданного месяца
     * */
    public getFirstDateOfMonthTable(firstDateOfCurrentMonth: Date): Date {
        const dayOfWeekCorrectionNumber: number = 2;

        let firstDayOfMonthTable: number = -firstDateOfCurrentMonth.getDay() + dayOfWeekCorrectionNumber;

        // getDay() возвращает число, соответствующее дню недели, в диапазоне [1, 2, 3, 4, 5, 6, 0]
        // поэтому при 0 необходимо отнять 7 еще для правильных расчетов
        if (this.currentMonth.getDay() === 0) {
            firstDayOfMonthTable -= 7;
        }

        return new Date(
            this.currentMonth.getFullYear(),
            this.currentMonth.getMonth(),
            firstDayOfMonthTable
        );
    }
}
