import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthGuard } from './auth/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then((m : any) => m.AuthModule)
            },
            {
                path: 'app',
                loadChildren: () => import('./layout-navigation/layout-navigation.module').then((m : any) => m.LayoutNavigationModule),
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard]
            },
            {
                path: '',
                redirectTo: '/app/pull',
                pathMatch: 'full'
            },
        ]
    },
];

@NgModule({
    declarations: [
    AppComponent,
    ],
    imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
    })
export class AppModule { }
