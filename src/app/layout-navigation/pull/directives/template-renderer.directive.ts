import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[filterInput]' })
export class TemplateRendererDirective {
    @Input()
    public set filterInput(el : TemplateRef<any> | undefined) {
        if (el !== undefined) {
            this._vr.clear();
            this._vr.createEmbeddedView(el);
        }
    }

    constructor(private _vr : ViewContainerRef) { }
}
