import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateModel } from '../../models/date-model';

@Component({
    selector: 'date-cell-component',
    templateUrl: './date-cell.component.html',
    styleUrls: ['./date-cell.component.css']
})
export class DateCellComponent {
    @Input()
    public dateModel: DateModel

    @Output()
    public taskSelected : EventEmitter<number> = new EventEmitter<number>();

    constructor () {
        this.dateModel = new DateModel(new Date(), true, false);
    }

    public taskClicked (id : number) : void {
        this.taskSelected.emit(id);
    }
}
