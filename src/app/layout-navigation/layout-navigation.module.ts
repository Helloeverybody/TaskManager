import { NgModule } from '@angular/core';
import { LayoutNavigationComponent } from './layout-navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

const appRoutes: Routes =[
    { path: '' , component: LayoutNavigationComponent, children: [
        { path: 'calendar', loadChildren: () => import('./calendar-view/calendar-view.module').then((m : any) => m.CalendarViewModule) },
        { path: 'pull',  loadChildren: () => import('./pull/pull.module').then((m : any) => m.PullModule) }
    ] }
];

@NgModule({
    declarations: [
        LayoutNavigationComponent
    ],
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    providers: [
        DatePipe
    ]
})
export class LayoutNavigationModule { }
