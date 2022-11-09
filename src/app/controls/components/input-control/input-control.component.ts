import { Component, Input, OnInit } from '@angular/core';
import { InputControlViewModel } from '../../view-models/input-control.view-model';
import { ControlBaseComponent } from '../../form-group/control.base.component';

@Component({
    selector: 'input-control',
    templateUrl: './input-control.component.html'
    })
export class InputControlComponent extends ControlBaseComponent<InputControlViewModel> implements OnInit {
    @Input()
    public customCssClass: string = '';

    public ngOnInit (): void {

    }
}
