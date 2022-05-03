import { Component } from '@angular/core';
import { DialogInjection } from '../../../../global-services/dialogInjection';
import { ListDataService } from '../../../services/list-data.service';
import { ListCreationViewModel } from '../../view-models/list-creation.view-model';

@Component({
    selector: 'list-creation-window',
    templateUrl: './list-creation.component.html',
    styleUrls: ['./list-creation.component.css'],
})
export class ListCreationComponent {
    public viewModel : ListCreationViewModel = new ListCreationViewModel();
    public filterHint : string = 'По этим фильтрам в список будут выбираться задачи из всех существующих задач';
    public listTypeHint : string = 'В ручном списке вы сами создаете задачи. В автоматическом списке задачи собираются по выбранным вами фильтрам';

    constructor(public data: ListDataService, private _closer: DialogInjection) { }

    public addList() : void {
        this.data.addList(this.viewModel.toModel(this.data.listsPull.length));
        console.log(this.data.listsPull);
        this._closer.close();
    }

    public closeForm() : void {
        this._closer.close();
    }

    public get isAuto() : boolean {
        return this.viewModel.form.value.isAuto === 'true';
    }
}
