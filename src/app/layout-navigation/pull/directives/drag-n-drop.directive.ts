import { Directive, ElementRef, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({ selector: '[drag]' })
export class DragAndDropDirective {
    private _top: number = 0;
    private _left: number = 0;
    private _offsetY: number | null = null;
    private _isDragged: boolean = false;
    private _taskOutsideBorders : boolean = false;

    constructor(private _element: ElementRef, private _renderer: Renderer2){ }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(event : MouseEvent) : void {
        console.log(event);

        // this._renderer.setStyle(this._element.nativeElement, 'position', 'absolute');
        // this._renderer.setStyle(this._element.nativeElement, 'width', '100px');
        // this._renderer.setStyle(this._element.nativeElement, 'border-radius', '30px');
        // this._renderer.setStyle(this._element.nativeElement, 'white-space', 'nowrap');
        // this._renderer.setStyle(this._element.nativeElement, 'border', '1px solid black');
        // this._renderer.setStyle(this._element.nativeElement, 'box-shadow', 'none');
        // this._renderer.setStyle(this._element.nativeElement, 'z-index', '100');

        this._top = this._element.nativeElement.offsetTop;
        this._left = this._element.nativeElement.offsetLeft;
        //this.onMouseMove(event);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    @HostListener('ondragstart')
    public onDragStart() : boolean {
        return false;
    }

    private onMouseMove : any = (event: MouseEvent) => {
        if (!this._isDragged) {
            this._renderer.addClass(this._element.nativeElement, 'task-moving');
            this._renderer.removeClass(this._element.nativeElement, 'task');
            this._isDragged = true;
        }

        if (this._offsetY === null) {
            this._offsetY = event.offsetY;
        }

        const downDistance : number = -(this._top - (event.clientY - this._offsetY));
        console.log(downDistance);

        this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
        const backElement : Element | null = document.elementFromPoint(event.clientX, event.clientY);
        this._renderer.setStyle(this._element.nativeElement, 'display', 'flex');


        if (downDistance > -20) {
            if (this._taskOutsideBorders) {
                this._taskOutsideBorders = false;
                this._renderer.setStyle(this._element.nativeElement, 'border', '1px solid black');
            }
            this._renderer.setStyle(this._element.nativeElement, 'top', (event.clientY - this._element.nativeElement.offsetHeight / 2) + 'px');
        } else {
            if (!this._taskOutsideBorders) {
                this._taskOutsideBorders = true;
                this._renderer.setStyle(this._element.nativeElement, 'border', '1px solid red');
            }
            this._renderer.setStyle(this._element.nativeElement, 'top', (this._top -10) + 'px');
        }

        this._renderer.setStyle(this._element.nativeElement, 'left', (event.clientX - this._element.nativeElement.offsetWidth / 2) + 'px');
    };

    private onMouseUp : any = (event: MouseEvent) => {
        // this._renderer.setStyle(this._element.nativeElement, 'position', 'static');
        // this._renderer.setStyle(this._element.nativeElement, 'width', 'auto');
        // this._renderer.setStyle(this._element.nativeElement, 'border-radius', '0');
        this._renderer.removeClass(this._element.nativeElement, 'task-moving');
        this._renderer.addClass(this._element.nativeElement, 'task');
        document.removeEventListener('mousemove', this.onMouseMove);
        document.onmousemove = null;
        this._isDragged = false;
    };
}
