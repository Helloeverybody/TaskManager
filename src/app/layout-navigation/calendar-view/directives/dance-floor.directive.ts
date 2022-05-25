import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({ selector: '[danceFloor]' })
export class DanceFloorDirective {
    @Input()
    public set danceFloor(value: boolean) {
        if (value && !this._isTurned) {
            setInterval(() => {
                const random : number = Math.floor(Math.random() * 6);
                this._renderer.setStyle(this._element.nativeElement, 'background-color', this._color[random]);
            }, 300);
            this._isTurned = true;
        }
    }

    private _isTurned : boolean = false;

    private _color : string[] = [
        'rgba(0,60,255,0.38)',
        'rgba(0,13,255,0.38)',
        'rgba(34,0,255,0.38)',
        'rgba(115,0,255,0.38)',
        'rgba(161,0,255,0.38)',
        'rgba(200,0,255,0.38)',
        'rgba(255,0,221,0.38)',
    ];

    constructor(private _element: ElementRef, private _renderer: Renderer2){ }
}
