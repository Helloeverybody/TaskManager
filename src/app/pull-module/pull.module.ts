import { NgModule } from '@angular/core';
import { PullComponent } from "./pull.component";
import { RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '',  component: PullComponent },
];

@NgModule({
  declarations: [PullComponent],
  imports: [RouterModule.forChild(routes)],
  providers: []
})
export class PullModule { }
