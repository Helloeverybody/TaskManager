import { FormControlViewModel } from '../form-group/form-control.view-model';

export class InputControlViewModel extends FormControlViewModel {
    public inputType: string;
    public placeholder: string;

    constructor (name: string, options?: IInputControlOptions) {
        super(name);

        this.inputType = options?.inputType || 'text';
        this.placeholder = options?.placeholder || '';
    }
}

export interface IInputControlOptions {
    inputType?: string;
    placeholder?: string;
}
