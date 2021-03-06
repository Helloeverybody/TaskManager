import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: AuthenticationComponent },
];

@NgModule({
    declarations: [
        AuthenticationComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes),
    ],
    providers: [],
})
export class AuthenticationModule { }
