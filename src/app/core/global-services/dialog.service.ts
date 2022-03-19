import { Injectable, Injector } from "@angular/core";
import { ComponentType, Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { DialogCloser } from "./dialogCloser";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}
  open<T>(component: ComponentType<T>) {
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

    const closer = new DialogCloser(overlayRef)

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogCloser, useValue: closer }
      ]
    })

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);
  }
}


