import {ModuleWithProviders, NgModule} from '@angular/core';
import { DataService } from "./global-services/data.service";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [],
  providers: [HttpClient]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        DataService
      ],
    }
  }
}
