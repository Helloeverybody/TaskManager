import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: CalendarComponent },
];

@NgModule({
    declarations: [
        CalendarComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    providers: []
})
export class CalendarModule { }
