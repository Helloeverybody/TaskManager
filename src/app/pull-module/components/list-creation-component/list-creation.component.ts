import {Component, OnInit} from '@angular/core';
import { List } from "../../../List-model";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

  lists: Array<List> = []
  constructor() {
  }

  addList () {
    this.lists.push(<List>{
      name: this.newListForm.value.name,
      color: this.newListForm.value.color,
      isAuto:  this.newListForm.value.isAuto
    })
  }

  ngOnInit(): void {
  }
}
