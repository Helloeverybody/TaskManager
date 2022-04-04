import { Component } from '@angular/core';
import { ListDataService } from '../services/list-data.service';
import { ListCreationComponent } from './components/list-creation/list-creation.component';
import { DialogService } from '../../core/global-services/dialog.service';

@Component({
    selector: 'pull-component',
    templateUrl: './pull.component.html',
    styleUrls: ['./pull.component.css']
})
export class PullComponent{
  public currentListId: number = 1
  public currentTaskId: number = 0

  constructor(public data: ListDataService, private _overlay: DialogService) { }

  public createNewList () : void {
      this._overlay.open(ListCreationComponent);
  }

  public setCurrentList (index: number) : void {
      this.currentListId = index;
  }

  public onTaskSelected (taskId: number) : void {
      this.currentTaskId = taskId;
  }
}
