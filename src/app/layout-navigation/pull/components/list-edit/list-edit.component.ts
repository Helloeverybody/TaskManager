import { Component } from '@angular/core';
import { List } from '../../models/list.model';
import { DialogInjection } from '../../../../global-services/dialogInjection';
import { ListDataService } from '../../../services/list-data.service';
import { ListEditViewModel } from '../../view-models/list-edit.view-model';

@Component({
    selector: 'list-creation-window',
    templateUrl: './list-edit.component.html',
    styleUrls: ['./list-edit.component.css'],
})
export class ListEditComponent {
    public viewModel : ListEditViewModel = new ListEditViewModel();
    public id : number = this._closer.parameter;
    public list : List;

    constructor(private _data: ListDataService, private _closer: DialogInjection) {
        this.list = _data.listsPull.find((list: List) => list.id === this.id) ?? new List();
        this.viewModel.fromModel(this.list);
    }

    public updateList() : void {
        this.list = this.viewModel.toModel(this.list);
        this._data.updateList(this.list);
        this._closer.close();
    }

    public deleteList() : void {
        this.list = this.viewModel.toModel(this.list);
        this._data.deleteList(this.list);
        this._closer.close();
    }

    public closeForm() : void {
        this._closer.close();
    }
}
