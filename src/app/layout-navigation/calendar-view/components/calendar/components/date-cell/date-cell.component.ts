import {
    Component, EventEmitter, Input, Output,
} from '@angular/core';
import { DateModel } from '../../models/date-model';

@Component({
    selector: 'date-cell-component',
    templateUrl: './date-cell.component.html',
    styleUrls: ['./date-cell.component.css'],
})
export class DateCellComponent {
    @Input()
    public dateModel: DateModel;

    @Input()
    public selectedTaskId : number = 0;

    @Output()
    public taskClickedEvent : EventEmitter<number> = new EventEmitter<number>();

    constructor() {
        this.dateModel = new DateModel(new Date(), true, false);
    }

    public taskClicked(id : number) : void {
        this.taskClickedEvent.emit(id);
    }
}
