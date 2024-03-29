import { Component, TemplateRef, ViewChild, } from '@angular/core';
import { DialogInjection } from '../../../../global-services/dialogInjection';
import { ListCreationViewModel } from '../../view-models/list-creation.view-model';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ListsService } from '../../../services/lists.service';
import { IList } from '../../interfaces/list.interface';

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

    private get templates() : any {
        return {
            timePeriod: this.timePeriod,
            priority: this.priority,
            listAffiliation: this.listAffiliation,
            completeness: this.completeness,
            userTag: this.userTag
        };
    }

    public inputTemplates : Array<TemplateRef<any> | undefined> = [];

    constructor(
        public listService: ListsService,
        private _closer: DialogInjection,
        private _fb : UntypedFormBuilder
    ) { }

    public setTemplate(id: number) : void {
        const type : string = this.viewModel.filters.controls[id].get('filterType')?.value;
        if (this.inputTemplates.length < id) {
            this.inputTemplates.push(undefined);
        }

        if (!this.inputTemplates[id] || this.inputTemplates[id] !== this.templates[type]) {
            this.viewModel.clearInputControl(id);
        }

        this.inputTemplates[id] = this.templates[type];
        this.viewModel.addControl[type](id);
    }

    public formHasControl(name: string) : boolean {
        const controls: AbstractControl[] = this.viewModel.filters.controls;

        return controls.find((control: AbstractControl) => control.get('filterType')?.value === name) !== undefined;
    }

    public getForm(id: number) : UntypedFormGroup {
        return this.viewModel.filters.controls[id] as UntypedFormGroup;
    }

    public removeFilter(id : number) : void {
        this.inputTemplates.splice(id, 1);
        this.viewModel.removeFilter(id);
    }

    public addList() : void {
        this.listService.getListsPull()
            .subscribe((lists: IList[]) => {
                this.listService.addList(this.viewModel.toModel(lists.length));
            });

        this._closer.close();
    }

    public closeForm() : void {
        this._closer.close();
    }

    public get isAuto() : boolean {
        return this.viewModel.form.value.isAuto === 'true';
    }
}
