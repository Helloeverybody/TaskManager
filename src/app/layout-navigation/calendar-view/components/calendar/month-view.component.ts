import { Component } from '@angular/core';
import { MonthDatesService } from '../../services/month-dates.service';
import { DateModel } from './models/date-model';

@Component({
    selector: 'month-view-component',
    templateUrl: './month-view.component.html',
    styleUrls: ['./month-view.component.css'],
})
export class MonthViewComponent {
    public currentMonth : Date = this._monthData.currentMonth;

    public monthTable : DateModel[][] = this._monthData.monthTable;

    public selectedTaskId : number | null = null;

    public isDisco : boolean = false;
    private _currentWord : string = '';

    constructor(private _monthData: MonthDatesService) {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.code === 'KeyC' && this._currentWord === '') {
                this._currentWord = 'С';
            } else if (event.code === 'KeyT' && this._currentWord === 'С') {
                this._currentWord = 'СЕ';
            } else if (event.code === 'KeyD' && this._currentWord === 'СЕ') {
                this._currentWord = 'СЕВ';
            } else if (event.code === 'KeyF' && this._currentWord === 'СЕВ') {
                this._currentWord = 'СЕВА';
                this.isDisco = true;
                this._currentWord = '';
            } else {
                this._currentWord = '';
            }
        });
    }

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
