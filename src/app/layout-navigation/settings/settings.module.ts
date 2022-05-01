import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    providers: [],
})
export class SettingsModule { }
