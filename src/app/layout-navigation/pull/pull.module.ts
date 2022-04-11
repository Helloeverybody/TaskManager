import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ListComponent } from './components/list/list.component';
import { ListCreationComponent } from './components/list-creation/list-creation.component';
import { PullComponent } from './pull.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: PullComponent },
];

@NgModule({
    declarations: [
        PullComponent,
        ListComponent,
        ListCreationComponent,
        TaskCreationComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        OverlayModule,
        SharedModule,
    ],
    exports: [
        TaskCreationComponent,
    ],
    providers: [],
})
export class PullModule { }
