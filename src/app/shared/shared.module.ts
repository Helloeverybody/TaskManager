import { NgModule } from '@angular/core';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        TaskDetailsComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        TaskDetailsComponent
    ],
    providers: []
})
export class SharedModule { }
