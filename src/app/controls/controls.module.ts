import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputControlComponent } from './components/input-control/input-control.component';

@NgModule({
    declarations: [
    InputControlComponent
    ],
    exports: [
    InputControlComponent
    ],
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ]
    })
export class ControlsModule {

}
