import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DialogInjection } from '../../core/global-services/dialogInjection';

@Component({
    selector: 'settings-component',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {

    @ViewChild('settingsContent')
    public content : ElementRef | undefined;

    constructor (private _closer: DialogInjection, private _renderer: Renderer2) { }

    public closeOverlay() : void {
        this._closer.close();
    }

    public setGeneral(): void {
        const div : ElementRef = this._renderer.createElement('div');
        const text : ElementRef = this._renderer.createText('Основные настройки');
        this._renderer.appendChild(div, text);
        this._renderer.appendChild(this.content?.nativeElement, div);
    }

    public setProfile(): void {
        const div : ElementRef = this._renderer.createElement('div');
        const text : ElementRef = this._renderer.createText('Настройки профиля');
        this._renderer.appendChild(div, text);
        this._renderer.appendChild(this.content?.nativeElement, div);
    }
}
