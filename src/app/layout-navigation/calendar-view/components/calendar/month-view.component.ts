import { Component } from '@angular/core';
import { MonthDatesService } from './services/month-dates.service';
import { DateModel } from './models/date-model';

@Component({
    selector: 'month-view-component',
    templateUrl: './month-view.component.html',
    styleUrls: ['./month-view.component.css'],
})
export class MonthViewComponent {
    public currentMonth : Date = this._monthData.currentMonth;

    public monthTable : DateModel[][] = this._monthData.monthTable;

    public selectedTaskId : number = 0;

    constructor(private _monthData: MonthDatesService) { }

    public onTaskClicked(taskId : number) : void {
        this.selectedTaskId = taskId;
    }

    public toNextMonth() : void {
        this._monthData.toNextMonth();
        this.currentMonth = this._monthData.currentMonth;
        this.monthTable = this._monthData.monthTable;
    }

    public toPreviousMonth() : void {
        this._monthData.toPreviousMonth();
        this.currentMonth = this._monthData.currentMonth;
        this.monthTable = this._monthData.monthTable;
    }
}
