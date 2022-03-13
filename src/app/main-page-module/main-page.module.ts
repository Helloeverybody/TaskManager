import { NgModule } from '@angular/core';
import { MainPageComponent } from "./main-page.component";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes =[
  { path: 'app/calendar', component: MainPageComponent, loadChildren: () => import('../calendar-module/calendar.module').then(m => m.CalendarModule) },
  { path: 'app/pull', component: MainPageComponent, loadChildren: () => import('../pull-module/pull.module').then(m => m.PullModule) },
  { path: '**', redirectTo: '/app/pull', pathMatch: 'prefix'}
];

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  providers: []
})
export class MainPageModule { }
