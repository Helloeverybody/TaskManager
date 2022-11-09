import { UntypedFormBuilder } from '@angular/forms';
import { AuthenticationDataModel } from '../models/authentication-data.model';
import { InputControlViewModel } from '../../controls/view-models/input-control.view-model';
import { FormGroupViewModel } from '../../controls/form-group/form-group.view-model';

export class AuthenticationViewModel {
    public formModel: FormGroupViewModel = new FormGroupViewModel([
        new InputControlViewModel('login', {
            inputType: 'email',
            placeholder: 'Логин'
        }),
        new InputControlViewModel('password', {
            inputType: 'password',
            placeholder: 'Пароль'
        })
    ]);

    public toModel() : AuthenticationDataModel {
        return {
            login: this.formModel.getControl('login')?.formControl.value,
            password: this.formModel.getControl('password')?.formControl.value,
        };
    }
}
