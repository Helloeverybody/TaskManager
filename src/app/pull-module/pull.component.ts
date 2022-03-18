import { Component } from '@angular/core';
import { DataService } from "../global-services/data.service";
import { ListCreationComponent } from "./components/list-creation-component/list-creation.component";
import { DialogService } from "../global-services/dialog.service";

@Component({
  selector: 'pull-component',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.css']
})
export class PullComponent{
  public overlayRef: any

  constructor(public data: DataService, public overlay: DialogService) { }

  ngOnInit () {

  }

  createNewList (){
    this.overlay.open(ListCreationComponent)
    console.log(this.data.pullOfLists)
  }
}
