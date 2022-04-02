import { Injectable, Injector } from '@angular/core';
import { ComponentType, GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogInjection } from './dialogInjection';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(private _overlay: Overlay, private _injector: Injector) { }

    public open<T>(component: ComponentType<T>, parameter?: any) : void {
        const positionStrategy : GlobalPositionStrategy = this._overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayRef : OverlayRef = this._overlay.create({
            positionStrategy,
            hasBackdrop: true,
            backdropClass: 'overlay-backdrop'
        });

        const closer : DialogInjection = new DialogInjection(overlayRef, parameter);

        const injector : Injector = Injector.create({
            parent: this._injector,
            providers: [
                { provide: DialogInjection, useValue: closer }
            ]
        });

        const portal : ComponentPortal<T> = new ComponentPortal(component, null, injector);
        overlayRef.attach(portal);
    }
}


