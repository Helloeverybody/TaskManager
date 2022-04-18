import { Component } from '@angular/core';
import { AuthenticationViewModel } from '../../../view-models/authentication.view-model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegistrationDataModel } from '../../../models/registration-data.model';
import { AuthenticationDataModel } from '../../../models/authentication-data.model';

@Component({
    selector: 'authentication-component',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
    public viewModel : AuthenticationViewModel = new AuthenticationViewModel();
    public submitTouched : boolean = false;

    constructor (private _router : Router, private _authService : AuthService) { }

    public toRegistration() : void {
        this._router.navigate(['/auth/registration']);
    }

    public submit() : void {
        this.submitTouched = true;
        if (this.viewModel.form.valid){
            const model: AuthenticationDataModel = this.viewModel.toModel();
            const isAuthorised : boolean = this._authService.authoriseUser(model);
            if (isAuthorised) {
                this._router.navigate(['/app/pull']);
            } else {
                // сделать какое-нибудь неприятное окошко, что доступ не разрешен
            }
        }
    }
}
