import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PullModule } from './layout-navigation/pull/pull.module';
import { CalendarViewModule } from './layout-navigation/calendar-view/calendar-view.module';
import { SettingsModule } from './layout-navigation/settings/settings.module';
import { LayoutNavigationModule } from './layout-navigation/layout-navigation.module';
import { CoreModule } from './core/core.module';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m : any) => m.AuthModule) },
            { path: 'app', loadChildren: () => import('./layout-navigation/layout-navigation.module').then((m : any) => m.LayoutNavigationModule) },
        ],
    },
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        AuthModule,
        PullModule,
        CalendarViewModule,
        SettingsModule,
        LayoutNavigationModule,
        CoreModule.forRoot(),
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
