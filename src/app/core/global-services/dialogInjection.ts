import { OverlayRef } from "@angular/cdk/overlay";

export class DialogInjection {
  constructor (private overlayRef: OverlayRef, public parameter?: any) { }

  public close () {
    this.overlayRef.dispose()
  }
}
