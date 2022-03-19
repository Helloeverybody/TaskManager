import {ModuleWithProviders, NgModule} from '@angular/core';
import { ListsDataService } from "../layout-navigation/services/lists-data.service";
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
        ListsDataService
      ],
    }
  }
}
