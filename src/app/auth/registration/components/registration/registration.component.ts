import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationViewModel } from '../../../view-models/registration.view-model';
import { RegistrationDataModel } from '../../../models/registration-data.model';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'registration-component',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
    public viewModel : RegistrationViewModel = new RegistrationViewModel();
    public submitTouched : boolean = false;

    constructor (private _router : Router, private _authService : AuthService) { }

    public toAuthentication() : void {
        this._router.navigate(['/auth/authentication']);
    }

    public submit() : void {
        this.submitTouched = true;
        if (this.viewModel.form.valid){
            const model: RegistrationDataModel = this.viewModel.toModel();
            this._authService.registerUser(model);
            this._router.navigate(['/auth/registration/confirmation']);
        }
    }
}
