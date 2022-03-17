import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from "./auth-module/auth.module";
import { PullModule } from "./pull-module/pull.module";
import { CalendarModule } from "./calendar-module/calendar.module";
import { SettingsModule } from "./settings-module/settings.module";
import { MainPageModule } from "./main-page-module/main-page.module";
import { CoreModule } from "./core.module";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth-module/auth.module').then(m => m.AuthModule) },
  { path: 'app', loadChildren: () => import('./main-page-module/main-page.module').then(m => m.MainPageModule)},
  { path: '**', redirectTo: '/app', pathMatch: 'prefix'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule,
    PullModule,
    CalendarModule,
    SettingsModule,
    MainPageModule,
    CoreModule.forRoot(),
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
