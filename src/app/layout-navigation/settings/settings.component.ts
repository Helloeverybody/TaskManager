import { Component } from '@angular/core';
import { DialogInjection } from '../../global-services/dialogInjection';

@Component({
    selector: 'settings-component',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
    public chapter : string = 'general';

    constructor (private _closer: DialogInjection) { }

    public closeOverlay() : void {
        this._closer.close();
    }

    public setChapter(chapter: string): void {
        this.chapter = chapter;
    }
}
