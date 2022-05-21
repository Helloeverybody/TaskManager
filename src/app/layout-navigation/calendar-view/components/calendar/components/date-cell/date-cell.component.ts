import {
    Component, EventEmitter, Input, Output,
} from '@angular/core';
import { DateModel } from '../../models/date-model';
import { TaskCreationComponent } from '../../../../../../shared/components/task-creation/task-creation.component';
import { DialogService } from '../../../../../../global-services/dialog.service';

@Component({
    selector: 'date-cell-component',
    templateUrl: './date-cell.component.html',
    styleUrls: ['./date-cell.component.css'],
})
export class DateCellComponent {
    @Input()
    public dateModel: DateModel;

    @Input()
    public selectedTaskId : number | null = null;

    @Output()
    public taskClickedEvent : EventEmitter<number> = new EventEmitter<number>();

    constructor(private _overlay: DialogService) {
        this.dateModel = new DateModel(new Date(), true, false, []);
    }

    public taskClicked(id : number) : void {
        this.taskClickedEvent.emit(id);
    }

    public createTask() : void {
        this._overlay.open(TaskCreationComponent, this.dateModel.date);
    }
}
