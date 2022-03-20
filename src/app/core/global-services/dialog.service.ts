import { Injectable, Injector } from "@angular/core";
import { ComponentType, Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { DialogInjection } from "./dialogInjection";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}
  open<T>(component: ComponentType<T>, parameter?: any) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop'
    });

    const closer = new DialogInjection(overlayRef, parameter)

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogInjection, useValue: closer }
      ]
    })

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);
  }
}


