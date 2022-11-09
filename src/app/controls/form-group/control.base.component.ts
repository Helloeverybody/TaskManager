import { Directive, Input } from '@angular/core';
import { FormControlViewModel } from './form-control.view-model';

@Directive()
export class ControlBaseComponent<T extends FormControlViewModel> {
    @Input()
    public model!: T;
}
