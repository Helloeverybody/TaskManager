import { Component } from '@angular/core';
import {DataService} from "../global-services/data.service";
import { List } from "../List-model";

@Component({
  selector: 'pull-component',
  templateUrl: './pull.component.html',
  styleUrls: ['./pull.component.css']
})
export class PullComponent {
  constructor(public data: DataService) { }

  ngOnInit () {

  }

  createNewList (){
    // здесь должен вызываться оверлей с созданием листа, а затем по кнопке "Создать" в оверлее - вся функциональность ниже
    this.data.addList(<List>{
      name: "Новый список",
      color: "#0fca00",
      isAuto: true,
      tasks: <Array<any>>[]
    })
  }
}
