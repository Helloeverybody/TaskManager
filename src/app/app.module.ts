import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CalendarComponent } from './page-components/calendar/calendar.component';
import { ListsPullComponent } from './page-components/lists-pull/lists-pull.component';
import { SettingsComponent } from './page-components/settings/settings.component';
import { ListComponent } from './page-elements/list/list.component';

const routes: Routes =[
  { path: 'calendar', component: CalendarComponent },
  { path: 'pull', component: ListsPullComponent },
  { path: '**', redirectTo: '/pull', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ListsPullComponent,
    SettingsComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
