import { Component } from '@angular/core';
import { HandleList } from '../../models/handleList.model';
import { DialogInjection } from '../../../../global-services/dialogInjection';
import { ListDataService } from '../../../services/list-data.service';
import { ListEditViewModel } from '../../view-models/list-edit.view-model';
import { IList } from '../../interfaces/list.interface';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'list-creation-window',
    templateUrl: './list-edit.component.html',
    styleUrls: ['./list-edit.component.css'],
})
export class ListEditComponent {
    public viewModel : ListEditViewModel = new ListEditViewModel(this._fb);
    public id : number = this._closer.parameter;
    public list : IList;

    constructor(private _data: ListDataService, private _closer: DialogInjection, private _fb : FormBuilder) {
        this.list = _data.listsPull.find((list: IList) => list.id === this.id) ?? new HandleList();
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
