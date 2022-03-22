import { NgModule } from '@angular/core';
import { PullComponent } from "./pull.component";
import { RouterModule, Routes} from "@angular/router";
import {ListCreationComponent} from "./components/list-creation/list-creation.component";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./components/list/list.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { TaskCreationComponent } from './components/task-creation/task-creation.component'
import { TaskDetailsComponent } from './components/task-details/task-details.component'

const routes: Routes = [
  { path: '', component: PullComponent },
];

@NgModule({
  declarations: [
    PullComponent,
    ListComponent,
    ListCreationComponent,
    TaskCreationComponent,
    TaskDetailsComponent
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