import { OverlayRef } from '@angular/cdk/overlay';

export class DialogInjection {
    constructor(private _overlayRef: OverlayRef, public parameter?: any) { }

    public close() : void {
        this._overlayRef.dispose();
    }
}
