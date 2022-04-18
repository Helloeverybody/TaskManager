import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PullModule } from './layout-navigation/pull/pull.module';
import { OverlayModule } from '@angular/cdk/overlay';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m : any) => m.AuthModule) },
            { path: 'app', loadChildren: () => import('./layout-navigation/layout-navigation.module').then((m : any) => m.LayoutNavigationModule) },
            { path: '', redirectTo: '/app/pull', pathMatch: 'full' },
        ]
    },
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        PullModule,
        RouterModule.forRoot(routes),
        CommonModule,
        HttpClientModule,
        OverlayModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
