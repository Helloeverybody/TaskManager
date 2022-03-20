import { Component, Input } from '@angular/core'
import { ListsDataService } from '../../../services/lists-data.service'
import { List } from '../../../../core/list.model'
import { DialogService } from '../../../../core/global-services/dialog.service'
import { TaskCreationComponent } from '../task-creation/task-creation.component'

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  private _listId: number = 0
  public list : List = new List()

  @Input()
  set listId(id: number){
    this._listId = id
    this.list = this.listsData.listsPull.find(this.findFunction(this.listId)) || new List
  }

  get listId () {
    return this._listId
  }

  constructor(private listsData: ListsDataService, private overlay: DialogService) { }

  findFunction (listId: number){
    return function (item : List) {
      return item.id === listId;
    }
  }

  createNewTask () {
    this.overlay.open(TaskCreationComponent, this._listId)
  }

  makeCompleted (index: number) {
    this.list.completedTasks.push(this.list.tasks[index])
    this.list.tasks.splice(index, 1)
  }

  makeUncompleted (index: number) {
    this.list.tasks.push(this.list.completedTasks[index])
    this.list.completedTasks.splice(index, 1)
  }
}
