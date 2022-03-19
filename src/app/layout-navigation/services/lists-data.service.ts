import { List } from "../../core/list.model";
import { Injectable } from "@angular/core";
import { lists } from './data/lists-data.mock'

@Injectable({providedIn: 'root'})
export class ListsDataService {
  private _listsPull : Array<List> = []

  get listsPull () : Array<List> {
    if (this._listsPull.length === 0) {
      this._listsPull = lists
    }
    return this._listsPull
  }

  constructor() { }

  addList (list: List) {
    list.id = this._listsPull.length + 1
    this._listsPull.push(list)
  }
}
