import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationDataModel } from '../models/authentication-data.model';

export class AuthenticationViewModel {
    public form: UntypedFormGroup = this._fb.group({
        login: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });

    constructor (private _fb : UntypedFormBuilder) { }

    public toModel() : AuthenticationDataModel {
        return {
            login: this.form.get('login')?.value,
            password: this.form.get('password')?.value,
        };
    }
}
