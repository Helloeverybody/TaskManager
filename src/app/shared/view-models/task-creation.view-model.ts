import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Task } from '../../core/task.model';

export class TaskCreationViewModel {
    public form: UntypedFormGroup = new UntypedFormGroup({
        title: new UntypedFormControl('', Validators.required),
        description: new UntypedFormControl(''),
        date: new UntypedFormControl(this.starDateValue()),
        time: new UntypedFormControl({ value: '00:00', disabled: true }),
        repeat: new UntypedFormControl('0'),
    });

    constructor(private _startValue: number | Date) {
        this.changeDateAccessibility(this.form.get('date')?.value);
        this.form.get('date')?.valueChanges.subscribe((value : any) => {
            this.changeDateAccessibility(value);
        });
    }

    public toModel(): Task {
        let dateTime : Date = new Date(
            `${this.form.get('date')?.value}T${this.form.get('time')?.value}`
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
            title: this.form.value.title,
            description: this.form.value.description,
            listId: listId,
            startDateTime: dateTime,
            endDateTime: dateTime,
            repeat: this.form.value.repeat,
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
            this.form.get('time')?.disable();
        } else {
            this.form.get('time')?.enable();
        }
    }
}
