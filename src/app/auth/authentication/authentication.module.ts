import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: AuthenticationComponent },
];

@NgModule({
    declarations: [
        AuthenticationComponent
    ],
    imports: [
        RouterModule.forChild(routes),
    ],
    providers: [],
})
export class AuthenticationModule { }
