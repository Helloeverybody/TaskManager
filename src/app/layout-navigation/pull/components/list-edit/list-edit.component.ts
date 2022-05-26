import { Component } from '@angular/core';
import { HandleList } from '../../models/handleList.model';
import { DialogInjection } from '../../../../global-services/dialogInjection';
import { DataLoaderService } from '../../../services/data-loader.service';
import { ListEditViewModel } from '../../view-models/list-edit.view-model';
import { IList } from '../../interfaces/list.interface';
import { FormBuilder } from '@angular/forms';
import { ListsService } from '../../../services/lists.service';
import { find, map, Observable } from 'rxjs';

@Component({
    selector: 'list-creation-window',
    templateUrl: './list-edit.component.html',
    styleUrls: ['./list-edit.component.css'],
})
export class ListEditComponent {
    public viewModel : ListEditViewModel = new ListEditViewModel(this._fb);
    public id : number = this._closer.parameter;
    public get list() : Observable<IList> {
        return this._listsService.listsPull
            .pipe(
                map((lists: IList[]) => {
                    return lists.find((list: IList) => list.id === this.id) ?? new HandleList();
                })
            );

    };

    constructor(private _listsService: ListsService, private _closer: DialogInjection, private _fb : FormBuilder) {
        this.list.subscribe((list: IList) => {
            this.viewModel.fromModel(list);
        });
    }

    public updateList() : void {
        this.list.subscribe((list: IList) => {
            list = this.viewModel.toModel(list);
            this._listsService.updateList(list);
        });
        this._closer.close();
    }

    public deleteList() : void {
        this.list.subscribe((list: IList) => {
            list = this.viewModel.toModel(list);
            this._listsService.deleteList(list);
        });
        this._closer.close();
    }

    public closeForm() : void {
        this._closer.close();
    }
}
