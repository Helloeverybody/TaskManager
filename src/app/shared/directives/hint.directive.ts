import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({ selector: '[hint]' })
export class HintDirective implements OnInit{
    @Input()
    public set hint(hint : string) {
        this._hint = hint;
    }

    private _div : ElementRef | null = null;

    private _hint: string = '';

    constructor(private _element: ElementRef, private _renderer: Renderer2){
        this._div = this._renderer.createElement('div');
        this._renderer.addClass(this._div, 'hint');
        this._renderer.setStyle(this._element.nativeElement, 'filter', 'grayscale(0%)');
    }

    public ngOnInit () : void {
        const hintElement : any = this._renderer.createText(this._hint);
        this._renderer.appendChild(this._div, hintElement);
    }

    @HostListener('mouseenter')
    public onMouseEnter() : void {
        this._renderer.appendChild(this._element.nativeElement, this._div);
    }

    @HostListener('mouseleave')
    public onMouseLeave() : void {
        this._renderer.removeChild(this._element.nativeElement, this._div);
    }
}
