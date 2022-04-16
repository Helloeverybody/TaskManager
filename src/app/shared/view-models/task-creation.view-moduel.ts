import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../core/task.model';
import { DialogInjection } from '../../core/global-services/dialogInjection';
import { ListDataService } from '../../layout-navigation/services/list-data.service';

export class TaskCreationViewModel {
    public newTaskForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        date: new FormControl(this._dialog.parameter instanceof Date ? this.starDateValue() : ''),
        time: new FormControl({ value: '00:00', disabled: true }),
        repeat: new FormControl('0'),
    });

    constructor(private _dialog: DialogInjection, private _listsData: ListDataService) {
        this.newTaskForm.get('date')?.valueChanges.subscribe((value : any) => {
            if (value === '') {
                this.newTaskForm.get('time')?.disable();
            } else {
                this.newTaskForm.get('time')?.enable();
            }
        });
    }

    public starDateValue () : string {
        let date : string = this._dialog.parameter.getDate().toString();
        let month : string = (this._dialog.parameter.getMonth() + 1).toString();
        const year : string = this._dialog.parameter.getFullYear().toString();
        if (month.length !== 2) {
            month = '0' + month;
        }
        if (date.length !== 2) {
            date = '0' + date;
        }

        return year + '-' + month + '-' + date;
    }

    public addTask() : void {
        let dateTime : Date = new Date(
            `${this.newTaskForm.get('date')?.value}T${this.newTaskForm.get('time')?.value}`
        );

        let listId : number = 2;
        if (typeof(this._dialog.parameter) === 'number') {
            listId = this._dialog.parameter;
        } else if (this._dialog.parameter instanceof Date) {
            dateTime = this._dialog.parameter;
        } else {
            throw('В компонент создания задачи передан неверный параметр! Принимается number или Date');
        }

        const task : Task = new Task(
            this._listsData.tasksPull.length + 1,
            this.newTaskForm.value.title,
            this.newTaskForm.value.description,
            listId,
            dateTime,
            dateTime,
            this.newTaskForm.value.repeat,
        );
        this._listsData.addTask(task);

        this._dialog.close();
    }
}
