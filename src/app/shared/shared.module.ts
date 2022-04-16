import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';

@NgModule({
    declarations: [
        TaskDetailsComponent,
        TaskCreationComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        TaskDetailsComponent,
        TaskCreationComponent
    ],
})
export class SharedModule { }
