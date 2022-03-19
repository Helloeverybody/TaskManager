import { Component, Input, OnInit } from '@angular/core'
import { ListsDataService } from '../../../services/lists-data.service'
import { List } from '../../../../core/list.model'

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
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

  constructor(private listsData: ListsDataService) { }

  findFunction (listId: number){
    return function (item : List) {
      return item.id === listId;
    }
  }


  ngOnInit(): void {

  }

}
