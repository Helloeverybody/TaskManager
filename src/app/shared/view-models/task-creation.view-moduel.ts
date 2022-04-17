import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../core/task.model';

export class TaskCreationViewModel {
    public newTaskForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        date: new FormControl(this.starDateValue()),
        time: new FormControl({ value: '00:00', disabled: true }),
        repeat: new FormControl('0'),
    });

    constructor(private _startValue: number | Date) {
        this.changeDateAccessibility(this.newTaskForm.get('date')?.value);
        this.newTaskForm.get('date')?.valueChanges.subscribe((value : any) => {
            this.changeDateAccessibility(value);
        });
    }

    public toModel(): Task {
        let dateTime : Date = new Date(
            `${this.newTaskForm.get('date')?.value}T${this.newTaskForm.get('time')?.value}`
        );

        let listId : number = 2;
        if (typeof(this._startValue) === 'number') {
            listId = this._startValue;
        } else if (this._startValue instanceof Date) {
            dateTime = this._startValue;
        } else {
            throw('В компонент создания задачи передан неверный параметр! Принимается number или Date');
        }

        return {
            id: 0,
            title: this.newTaskForm.value.title,
            description: this.newTaskForm.value.description,
            listId: listId,
            startDateTime: dateTime,
            endDateTime: dateTime,
            repeat: this.newTaskForm.value.repeat,
            isCompleted: false
        };
    }

    public starDateValue () : string {
        if (this._startValue instanceof Date) {
            let date : string = this._startValue.getDate().toString();
            let month : string = (this._startValue.getMonth() + 1).toString();
            const year : string = this._startValue.getFullYear().toString();
            if (month.length !== 2) {
                month = '0' + month;
            }
            if (date.length !== 2) {
                date = '0' + date;
            }

            return year + '-' + month + '-' + date;
        } else {
            return '';
        }
    }

    private changeDateAccessibility(value: string) : void {
        if (value === '') {
            this.newTaskForm.get('time')?.disable();
        } else {
            this.newTaskForm.get('time')?.enable();
        }
    }
}
