import { Component, TemplateRef, ViewChild, } from '@angular/core';
import { DialogInjection } from '../../../../global-services/dialogInjection';
import { ListDataService } from '../../../services/list-data.service';
import { ListCreationViewModel } from '../../view-models/list-creation.view-model';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'list-creation-window',
    templateUrl: './list-creation.component.html',
    styleUrls: ['./list-creation.component.css'],
})
export class ListCreationComponent {
    public viewModel : ListCreationViewModel = new ListCreationViewModel(this._fb);
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

    public inputTemplates : Array<TemplateRef<any> | undefined> = [];

    constructor(public data: ListDataService, private _closer: DialogInjection, private _fb : FormBuilder) {}

    public setTemplate(id: number) : void {
        const val : string = this.viewModel.filters.controls[id].get('filterType')?.value;
        if (this.inputTemplates.length < id) {
            this.inputTemplates.push(undefined);
        }

        if (val === 'timePeriod') {
            this.inputTemplates[id] = this.timePeriod;
            this.viewModel.addTimePeriodControls(id);
        } else if (val === 'priority') {
            this.inputTemplates[id] = this.priority;
        } else if (val === 'listAffiliation') {
            this.inputTemplates[id] = this.listAffiliation;
        } else if (val === 'completeness') {
            this.inputTemplates[id] = this.completeness;
        } else if (val === 'userTag') {
            this.inputTemplates[id] = this.userTag;
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
