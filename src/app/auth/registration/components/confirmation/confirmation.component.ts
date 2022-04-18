import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'confirmation-component',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
    constructor (private _router: Router) { }

    public toAuth() : void {
        this._router.navigate(['/auth/authentication']);
    }
}
