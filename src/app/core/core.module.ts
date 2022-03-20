import {ModuleWithProviders, NgModule} from '@angular/core';
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

      ],
    }
  }
}
