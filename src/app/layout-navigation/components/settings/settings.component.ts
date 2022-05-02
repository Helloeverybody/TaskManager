import { Component } from '@angular/core';
import { DialogInjection } from '../../../global-services/dialogInjection';
import { AuthorizationService } from '../../../global-services/authorizaton.service';
import { Router } from '@angular/router';
import { ListDataService } from '../../services/list-data.service';

@Component({
    selector: 'settings-component',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
    public chapter : string = 'general';

    constructor (private _closer: DialogInjection,
        private _auth: AuthorizationService,
        private _router: Router,
        private _listData: ListDataService) { }

    public closeOverlay() : void {
        this._closer.close();
    }

    public setChapter(chapter: string): void {
        this.chapter = chapter;
    }

    public quitUser() : void {
        this._auth.deleteToken();
        this._listData.clearData();
        this.closeOverlay();
        this._router.navigate(['auth/authentication']);
    }
}
