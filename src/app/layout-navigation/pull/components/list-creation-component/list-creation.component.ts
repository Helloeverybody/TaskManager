import {Component, OnInit} from '@angular/core';
import { List } from "../../../../core/list.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {DialogCloser} from "../../../../core/global-services/dialogCloser";
import {ListsDataService} from "../../../services/lists-data.service";

@Component({
  selector: 'list-creation-window',
  templateUrl: './list-creation.component.html',
  styleUrls: ['./list-creation.component.css']
})
export class ListCreationComponent implements OnInit {
  newListForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    isAuto: new FormControl("false", Validators.required),
    color: new FormControl()
  })

  constructor (public data: ListsDataService, private closer: DialogCloser) { }

  addList () {
    this.data.addList(<List>{
      name: this.newListForm.value.name,
      color: this.newListForm.value.color,
      isAuto:  this.newListForm.value.isAuto,
      tasks: <Array<any>>[]
    })

    this.closer.close()
  }

  closeForm () {
    this.closer.close()
  }

  ngOnInit(): void {
  }
}
