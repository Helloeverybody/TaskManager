import {List} from "../List-model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class DataService {
  private _pullOfLists : Array<List> = []

  get pullOfLists () : Array<List> {
    if (this._pullOfLists.length === 0) {
      this.http.get('assets/mocks/lists.data.json').subscribe((data: any) => this._pullOfLists = <Array<List>>data)
    }
    return this._pullOfLists
  }

  addList (list: List) {
    this._pullOfLists.push(list)
  }


  constructor(private http: HttpClient) {
  }

  saveListsData (pullOfLists: Array<List>) {
    this.http.post('assets/mocks/lists.data.json', JSON.stringify(pullOfLists))
  }
}
