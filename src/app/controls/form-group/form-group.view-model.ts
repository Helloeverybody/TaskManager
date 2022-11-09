import { FormControlViewModel } from './form-control.view-model';
import { merge } from 'rxjs';

export class FormGroupViewModel {
    public controls: FormControlViewModel[];
    public submit: boolean = false;
    public valid: boolean = false;

    public get pristine(): boolean {
        return true;
    }

    public get dirty(): boolean {
        return false;
    }

    constructor (formControls: FormControlViewModel[]) {
        this.controls = formControls;

        merge(this.controls.map((control: FormControlViewModel) => control.formControl.valueChanges))
            .subscribe(() => {
                this.valid = true;
            });
    }

    public getControl<T extends FormControlViewModel>(controlName: string): T {
        return this.controls.find((control: FormControlViewModel) => control.name === controlName) as T;
    }
}
