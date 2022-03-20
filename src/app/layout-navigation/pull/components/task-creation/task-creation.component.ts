import { Component } from '@angular/core'
import { DialogInjection } from '../../../../core/global-services/dialogInjection'
import { ListsDataService } from '../../../services/lists-data.service'
import { List } from '../../../../core/list.model'
import { Task } from '../../../../core/task.model'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent {
  newTaskForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl(""),
    date: new FormControl(""),
    time: new FormControl(""),
    repeat: new FormControl("0")
  })

  constructor (private dialog: DialogInjection, private listsData: ListsDataService) { }

  findFunction (listId: number){
    return function (item : List) {
      return item.id === listId;
    }
  }

  addTask () {
    let list = this.listsData.listsPull.find(this.findFunction(this.dialog.parameter))
    if (list !== undefined) {
      list.tasks.push(new Task(this.newTaskForm.value.title, this.newTaskForm.value.description, this.dialog.parameter,
          this.newTaskForm.value.time, this.newTaskForm.value.time, this.newTaskForm.value.repeat))
    }
    console.log(list)
    this.dialog.close()
  }

  closeForm () {
    this.dialog.close()
  }
}
