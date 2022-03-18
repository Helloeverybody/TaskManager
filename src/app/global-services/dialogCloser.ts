import {OverlayRef} from "@angular/cdk/overlay";

export class DialogCloser {
  constructor (private overlayRef: OverlayRef) { }

  public close () {
    this.overlayRef.dispose()
  }
}
