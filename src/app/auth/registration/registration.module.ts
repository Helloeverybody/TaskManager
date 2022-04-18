import { NgModule } from '@angular/core';
import { RegistrationComponent } from './components/registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: RegistrationComponent },
    { path: 'confirmation', component: ConfirmationComponent }
];

@NgModule({
    declarations: [
        RegistrationComponent,
        ConfirmationComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
})
export class RegistrationModule { }
