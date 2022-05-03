import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthServerService } from './services/auth-server.service';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'registration',
                loadChildren: () => import('./registration/registration.module').then((m : any) => m.RegistrationModule),
                canActivate: [AuthRedirectGuard]
            },
            {
                path: 'authentication',
                loadChildren: () => import('./authentication/authentication.module').then((m : any) => m.AuthenticationModule),
                canActivate: [AuthRedirectGuard]
            },
            {
                path: '',
                redirectTo: '/auth/authentication'
            }
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
        AuthService,
        AuthServerService,
        AuthRedirectGuard
    ],
})
export class AuthModule { }
