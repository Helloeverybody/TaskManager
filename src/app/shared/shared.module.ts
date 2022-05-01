import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { RepeatPipe } from '../layout-navigation/pipes/repeat.pipe';

@NgModule({
    declarations: [
        TaskDetailsComponent,
        TaskCreationComponent,
        RepeatPipe
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
