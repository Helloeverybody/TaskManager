import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ListsDataService } from '../../../services/lists-data.service'
import { List } from '../../../../core/list.model'
import { DialogService } from '../../../../core/global-services/dialog.service'
import { TaskCreationComponent } from '../task-creation/task-creation.component'
import { Task } from '../../../../core/task.model'

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  private _listId: number = 0

  @Input()
  set listId(id: number){
    this._listId = id
    this.list = this.listsData.listsPull.find(this.findFunction(this._listId)) || new List
    this.selectedTaskId = 0
    this.selectTask(0)
  }

  get completedTasks() {
    return this.list.tasks.filter(function(item) {
      return item.isCompleted
    })
  }

  get uncompletedTasks() {
    return this.list.tasks.filter(function(item) {
      return !item.isCompleted
    })
  }

  public list : List = new List()
  public selectedTaskId : number = 0

  constructor(private listsData: ListsDataService, private overlay: DialogService) { }

  findFunction (listId: number){
    return function (item : List) {
      return item.id === listId;
    }
  }

  createNewTask () {
    this.overlay.open(TaskCreationComponent, this._listId)
  }

  makeCompleted (id: number) {
    let task = this.list.tasks.find(function (item) {
      return item.id === id
    })
    if (task) {
      task.isCompleted = true
    }
  }

  makeUncompleted (id: number) {
    let task = this.list.tasks.find(function (item) {
      return item.id === id
    })
    if (task) {
      task.isCompleted = false
    }
  }

  @Output() onTaskSelected = new EventEmitter<number>();
  selectTask (id: number) {
    this.selectedTaskId = id
    this.onTaskSelected.emit(id)
  }
}
