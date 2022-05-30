import { Component } from '@angular/core';
import { HandleList } from '../../models/handleList.model';
import { DialogInjection } from '../../../../global-services/dialogInjection';
import { ListEditViewModel } from '../../view-models/list-edit.view-model';
import { IList } from '../../interfaces/list.interface';
import { FormBuilder } from '@angular/forms';
import { ListsService } from '../../../services/lists.service';

@Component({
    selector: 'list-creation-window',
    templateUrl: './list-edit.component.html',
    styleUrls: ['./list-edit.component.css'],
})
export class ListEditComponent {
    public viewModel : ListEditViewModel = new ListEditViewModel(this._fb);
    public id : number = this._closer.parameter;

    public list!: IList;

    constructor(private _listsService: ListsService, private _closer: DialogInjection, private _fb : FormBuilder) {
        this.getList();
        this.viewModel.fromModel(this.list);
    }

    public getList() : void {
        this._listsService.getListsPull()
            .subscribe((lists: IList[]) => {
                this.list = lists.find((list: IList) => list.id === this.id) ?? new HandleList();
            });
    };

    public updateList() : void {
        this.list = this.viewModel.toModel(this.list);
        this._listsService.updateList(this.list);
        this._closer.close();
    }

    public deleteList() : void {
        this.list = this.viewModel.toModel(this.list);
        this._listsService.deleteList(this.list);
        this._closer.close();
    }

    public closeForm() : void {
        this._closer.close();
    }
}
