import { Component, OnInit } from '@angular/core';
import { List } from '../../../../core/list.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogInjection } from '../../../../core/global-services/dialogInjection';
import { ListsDataService } from '../../../services/lists-data.service';

@Component({
    selector: 'list-creation-window',
    templateUrl: './list-creation.component.html',
    styleUrls: ['./list-creation.component.css']
})
export class ListCreationComponent implements OnInit {
    public newListForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        isAuto: new FormControl('false', Validators.required),
        color: new FormControl()
    })

    constructor (public data: ListsDataService, private _closer: DialogInjection) { }

    public addList () : void {
        this.data.addList (new List(this.newListForm.value.title,
            this.data.listsPull.length,
            this.newListForm.value.color,
            this.newListForm.value.isAuto,
            true
        ));

        this._closer.close();
    }

    public closeForm () : void {
        this._closer.close();
    }

    public ngOnInit() : void { }
}
