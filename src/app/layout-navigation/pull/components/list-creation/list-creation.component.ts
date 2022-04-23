import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { List } from '../../../../core/list.model';
import { DialogInjection } from '../../../../global-services/dialogInjection';
import { ListDataService } from '../../../services/list-data.service';

@Component({
    selector: 'list-creation-window',
    templateUrl: './list-creation.component.html',
    styleUrls: ['./list-creation.component.css'],
})
export class ListCreationComponent {
    public newListForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        isAuto: new FormControl('false', Validators.required),
        color: new FormControl(),
    });

    constructor(public data: ListDataService, private _closer: DialogInjection) { }

    public addList() : void {
        this.data.addList(new List(
            this.newListForm.value.title,
            this.data.listsPull.length,
            this.newListForm.value.color,
            this.newListForm.value.isAuto,
            true,
        ));

        this._closer.close();
    }

    public closeForm() : void {
        this._closer.close();
    }
}
