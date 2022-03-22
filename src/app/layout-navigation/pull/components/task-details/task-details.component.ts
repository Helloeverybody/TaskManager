import { Component, Input } from '@angular/core'
import { ListsDataService } from '../../../services/lists-data.service'
import { Task } from '../../../../core/task.model'
import { List } from '../../../../core/list.model'

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  @Input() public listId: number = 0
  @Input() public taskId: number = -1
  private _task: Task = new Task()

  get task () : Task {
    if (this._task.id !== this.taskId) {
      let list = this.listsData.listsPull.find(this.findFunction(this.listId)) || new List()
      this._task = list.tasks.find(this.findFunction(this.taskId)) || new Task()
    }
    return this._task
  }

  set task (value: Task) {
    this._task = value
  }

  constructor (private listsData: ListsDataService) { }

  findFunction (id: number) {
    return function (item: List | Task) {
      return item.id === id
    }
  }

  changeCompleted () {
    this._task.isCompleted = !this._task.isCompleted;
  }

  getRepeatMode () {
    return RepeatMode[this.task.repeat]
  }
}

enum RepeatMode{
  "без повтора",
  "каждый день",
  "каждую неделю",
  "каждый месяц",
  "каждый год"
}
