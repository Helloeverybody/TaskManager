import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'registration', loadChildren: () => import('./registration/registration.module').then((m : any) => m.RegistrationModule) },
            { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then((m : any) => m.AuthenticationModule) },
            { path: '', redirectTo: '/auth/authentication' }
        ],
    },
];

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        RouterModule.forChild(routes),
    ],
    providers: [
        AuthService
    ],
})
export class AuthModule { }
