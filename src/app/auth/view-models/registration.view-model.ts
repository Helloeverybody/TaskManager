import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationDataModel } from '../models/registration-data.model';
import { passwordConfirmValidator } from '../validators/password-confirm.validator';

export class RegistrationViewModel {
    public form: FormGroup = this._fb.group({
        login: ['', [
            Validators.required,
            Validators.pattern(/^\w+$/),
            Validators.minLength(6),
        ]],
        email: ['', [
            Validators.required,
            Validators.email,
        ]],
        password: ['', [
            Validators.required,
            Validators.pattern(/^[\w!"#$%&'()*+,\-./]+$/),
            Validators.minLength(8),
        ]],
        passwordConfirmation: ['', Validators.required],
    },{ validators : passwordConfirmValidator });

    constructor (private _fb : FormBuilder) { }

    public toModel() : RegistrationDataModel {
        return {
            login: this.form.get('login')?.value,
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value,
        };
    }
}
