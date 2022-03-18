import { NgModule } from '@angular/core';
import { PullComponent } from "./pull.component";
import { RouterModule, Routes} from "@angular/router";
import {ListCreationComponent} from "./components/list-creation-component/list-creation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ListComponent} from "./components/list-component/list.component";
import {OverlayModule} from "@angular/cdk/overlay";

const routes: Routes = [
  { path: '',  component: PullComponent },
];

@NgModule({
  declarations: [
    PullComponent,
    ListComponent,
    ListCreationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OverlayModule
  ],
  providers: []
})
export class PullModule { }
