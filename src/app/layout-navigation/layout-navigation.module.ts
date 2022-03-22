import { NgModule } from '@angular/core';
import { LayoutNavigationComponent } from "./layout-navigation.component";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes =[
  { path: '' , component: LayoutNavigationComponent, children: [
      { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },
      { path: 'pull',  loadChildren: () => import('./pull/pull.module').then(m => m.PullModule) }
    ] }
];

@NgModule({
  declarations: [LayoutNavigationComponent],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  providers: []
})
export class LayoutNavigationModule { }
