import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { LayoutNavigationComponent } from './layout-navigation.component';
import { DialogService } from '../global-services/dialog.service';
import { SettingsComponent } from './components/settings/settings.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LayoutNavigationComponent,
        children: [
            { path: 'calendar', loadChildren: () => import('./calendar-view/calendar-view.module').then((m : any) => m.CalendarViewModule) },
            { path: 'pull', loadChildren: () => import('./pull/pull.module').then((m : any) => m.PullModule) },
        ],
    },
];

@NgModule({
    declarations: [
        LayoutNavigationComponent,
        SettingsComponent
    ],
    imports: [
        RouterModule.forChild(appRoutes),
        CommonModule
    ],
    providers: [
        DatePipe,
        DialogService
    ],
})
export class LayoutNavigationModule { }
