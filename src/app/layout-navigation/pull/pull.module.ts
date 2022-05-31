import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HandleListComponent } from './components/handle-list/handle-list.component';
import { ListCreationComponent } from './components/list-creation/list-creation.component';
import { PullComponent } from './pull.component';
import { SharedModule } from '../../shared/shared.module';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { TemplateRendererDirective } from './directives/template-renderer.directive';

const routes: Routes = [
    { path: '', component: PullComponent },
];

@NgModule({
    declarations: [
        PullComponent,
        HandleListComponent,
        ListEditComponent,
        ListCreationComponent,
        TemplateRendererDirective,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
    ]
})
export class PullModule { }
