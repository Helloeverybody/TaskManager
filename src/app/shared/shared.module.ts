import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskCreationComponent } from './components/task-creation/task-creation.component';
import { RepeatPipe } from '../layout-navigation/pipes/repeat.pipe';
import { HintDirective } from './directives/hint.directive';

@NgModule({
    declarations: [
        TaskDetailsComponent,
        TaskCreationComponent,
        RepeatPipe,
        HintDirective
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        TaskDetailsComponent,
        TaskCreationComponent,
        HintDirective
    ],
    providers: [
        AsyncPipe
    ]
})
export class SharedModule { }
