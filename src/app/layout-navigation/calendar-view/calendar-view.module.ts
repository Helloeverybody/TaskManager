import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from './calendar-view.component';
import { SharedModule } from '../../shared/shared.module';
import { MonthViewComponent } from './components/calendar/month-view.component';
import { DateCellComponent } from './components/calendar/components/date-cell/date-cell.component';
import { MonthDatesService } from './services/month-dates.service';
import { DanceFloorDirective } from './directives/dance-floor.directive';

const routes: Routes = [
    { path: '', component: CalendarViewComponent },
];

@NgModule({
    declarations: [
        CalendarViewComponent,
        MonthViewComponent,
        DateCellComponent,
        DanceFloorDirective
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
    ],
    providers: [
        MonthDatesService,
    ],
})
export class CalendarViewModule { }
