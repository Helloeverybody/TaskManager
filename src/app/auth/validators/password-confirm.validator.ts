import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordConfirmValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password : AbstractControl | null = control.get('password');
    const passwordConfirmation : AbstractControl | null = control.get('passwordConfirmation');

    return password && passwordConfirmation && password.value === passwordConfirmation.value ? null : { passwordConfirmed: true };
};
