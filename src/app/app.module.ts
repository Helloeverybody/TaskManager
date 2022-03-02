import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LogInComponent } from './page-components/log-in/log-in.component';
import { SignUpComponent } from './page-components/sign-up/sign-up.component';
import { ConfirmationComponent } from './page-components/confirmation/confirmation.component';
import { TaskManagerComponent } from './page-components/task-manager/task-manager.component';
import { CalendarComponent } from './page-components/calendar/calendar.component';
import { ListsPullComponent } from './page-components/lists-pull/lists-pull.component';
import { SettingsComponent } from './page-components/settings/settings.component';

const appRoutes: Routes =[
  { path: 'settings', component: SettingsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'pul', component: ListsPullComponent }
];

const globalRoutes: Routes =[
  { path: '', component: LogInComponent },
  { path: 'registration', component: SignUpComponent },
  { path: 'confirm', component: ConfirmationComponent },
  { path: 'app', component: TaskManagerComponent, children: appRoutes}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    ConfirmationComponent,
    TaskManagerComponent,
    CalendarComponent,
    ListsPullComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(globalRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
