import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({ selector: '[drag]' })
export class DragAndDropDirective {
    private _width: number = 0;
    private _height: number = 0;

    constructor(private _element: ElementRef, private _renderer: Renderer2){ }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(event : MouseEvent) : void {
        console.log(event);


        this._renderer.setStyle(this._element.nativeElement, 'position', 'absolute');
        this._renderer.setStyle(this._element.nativeElement, 'width', '100px');
        this._renderer.setStyle(this._element.nativeElement, 'border-radius', '30px');
        this._renderer.setStyle(this._element.nativeElement, 'white-space', 'nowrap');
        this._renderer.setStyle(this._element.nativeElement, 'z-index', '100');
        this.onMouseMove(event);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    @HostListener('ondragstart')
    public onDragStart() : boolean {
        return false;
    }

    private onMouseMove : any = (event: MouseEvent) => {
        this._renderer.setStyle(this._element.nativeElement, 'top', (event.clientY - this._element.nativeElement.offsetHeight / 2) + 'px');
    };

    private onMouseUp : any = (event: MouseEvent) => {
        this._renderer.setStyle(this._element.nativeElement, 'position', 'static');
        document.removeEventListener('mousemove', this.onMouseMove);
        document.onmousemove = null;
    };
}
