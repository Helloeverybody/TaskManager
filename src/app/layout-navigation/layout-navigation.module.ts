import { NgModule } from '@angular/core';
import { LayoutNavigationComponent } from "./layout-navigation.component";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes =[
  { path: 'calendar', component: LayoutNavigationComponent, loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },
  { path: 'pull', component: LayoutNavigationComponent, loadChildren: () => import('./pull/pull.module').then(m => m.PullModule) },
  { path: '**', redirectTo: '/app/pull', pathMatch: 'prefix'}
];

@NgModule({
  declarations: [LayoutNavigationComponent],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  providers: []
})
export class LayoutNavigationModule { }
