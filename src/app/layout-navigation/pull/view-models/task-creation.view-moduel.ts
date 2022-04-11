import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TaskCreationViewModel {
    public newTaskForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        date: new FormControl(''),
        time: new FormControl({ value: '00:00', disabled: true }),
        repeat: new FormControl('0'),
    });

    constructor() {
        this.newTaskForm.get('date')?.valueChanges.subscribe((value : any) => {
            if (value === '') {
                this.newTaskForm.get('time')?.disable();
            } else {
                this.newTaskForm.get('time')?.enable();
            }
        });
    }
}
