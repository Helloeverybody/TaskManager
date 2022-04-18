import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationDataModel } from '../models/registration-data.model';
import { passwordConfirmValidator } from '../validators/password-confirm.validator';

export class RegistrationViewModel {
    public form: FormGroup = new FormGroup({
        login: new FormControl('', [
            Validators.required,
            Validators.pattern(/^\w+$/),
            Validators.minLength(6),
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[\w!"#$%&'()*+,\-./]+$/),
            Validators.minLength(8),
        ]),
        passwordConfirmation: new FormControl('', [
            Validators.required,
        ]),
    }, { validators : passwordConfirmValidator });

    public toModel() : RegistrationDataModel {
        return {
            login: this.form.get('login')?.value,
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value,
            passwordConfirmation: this.form.get('passwordConfirmation')?.value,
        };
    }
}
