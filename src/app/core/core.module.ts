import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogInjection } from './global-services/dialogInjection';
import { DialogService } from './global-services/dialog.service';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        OverlayModule,
        PortalModule,
    ],
    exports: [],
    providers: [
        HttpClient
    ],
})
export class CoreModule {
    public static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                DialogInjection,
                DialogService
            ],
        };
    }
}
