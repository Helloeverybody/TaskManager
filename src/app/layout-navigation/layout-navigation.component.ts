import { Component } from '@angular/core';
import { DialogService } from '../global-services/dialog.service';
import { SettingsComponent } from './components/settings/settings.component';

@Component({
    selector: 'layout-nav-component',
    templateUrl: './layout-navigation.component.html',
    styleUrls: ['./layout-navigation.component.css'],
})
export class LayoutNavigationComponent {
    constructor (private _overlay: DialogService) {
    }

    public openSettings() : void {
        this._overlay.open(SettingsComponent);
    }
}
