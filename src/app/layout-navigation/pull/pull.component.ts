import { Component } from '@angular/core';
import { ListsDataService } from "../services/lists-data.service";
import { ListCreationComponent } from "./components/list-creation/list-creation.component";
import { DialogService } from "../../core/global-services/dialog.service";

@Component({
  selector: 'pull-component',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.css']
})
export class PullComponent{
  public currentListId: number = 1

  constructor(public data: ListsDataService, private overlay: DialogService) { }

  createNewList (){
    this.overlay.open(ListCreationComponent)
  }

  setCurrentList (index: number) {
    this.currentListId = index
  }
}
