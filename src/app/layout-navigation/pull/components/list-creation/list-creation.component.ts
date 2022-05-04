import { Component, TemplateRef, ViewChild, } from '@angular/core';
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


    @ViewChild('timePeriod')
    public timePeriod : TemplateRef<any> | undefined = undefined;

    @ViewChild('priority')
    public priority : TemplateRef<any> | undefined = undefined;

    @ViewChild('listAffiliation')
    public listAffiliation : TemplateRef<any> | undefined = undefined;

    @ViewChild('completeness')
    public completeness : TemplateRef<any> | undefined = undefined;

    @ViewChild('userTag')
    public userTag : TemplateRef<any> | undefined = undefined;

    constructor(public data: ListDataService, private _closer: DialogInjection) { }

    public getTemplate(id: number) : TemplateRef<any> | undefined {
        const val : string = this.viewModel.filters.controls[id].get('filterType')?.value;
        if (val === 'timePeriod') {
            return this.timePeriod;
        } else if (val === 'priority') {
            return this.priority;
        } else if (val === 'listAffiliation') {
            return this.listAffiliation;
        } else if (val === 'completeness') {
            return this.completeness;
        } else if (val === 'userTag') {
            return this.userTag;
        } else {
            return undefined;
        }
    }

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

    public a(value: any) : void {
        console.log(value);
    }
}
