import { Component } from '@angular/core';
import { MonthDatesService } from '../../services/month-dates.service';

@Component({
    selector: 'month-view-component',
    templateUrl: './month-view.component.html',
    styleUrls: ['./month-view.component.css'],
})
export class MonthViewComponent {
    public currentMonth : Date = this.monthData.currentMonth;

    public selectedTaskId : number | null = null;

    public isDisco : boolean = false;
    private _currentWord : string = '';

    constructor(public monthData: MonthDatesService) {
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
        this.monthData.toNextMonth();
        this.currentMonth = this.monthData.currentMonth;
    }

    public toPreviousMonth() : void {
        this.monthData.toPreviousMonth();
        this.currentMonth = this.monthData.currentMonth;
    }
}
