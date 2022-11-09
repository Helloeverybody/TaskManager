import { FormControl } from '@angular/forms';

export abstract class FormControlViewModel {
    public name: string;
    public formControl: FormControl;

    protected constructor (name: string) {
        this.name = name;
        this.formControl = new FormControl();
    }
}
