import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogInjection } from './global-services/dialogInjection';
import { DialogService } from './global-services/dialog.service';

@NgModule({
    declarations: [],
    imports: [],
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
