import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationDataModel } from '../models/authentication-data.model';

export class AuthenticationViewModel {
    public form: FormGroup = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    public toModel() : AuthenticationDataModel {
        return {
            login: this.form.get('login')?.value,
            password: this.form.get('password')?.value,
        };
    }
}
