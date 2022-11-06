import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IList } from '../interfaces/list.interface';
import { AutoListCreator } from '../models/autoListCreator.model';
import { HandleListCreator } from '../models/handleListCreator.model';
import { IListCreator } from '../interfaces/listCreator.interface';

export class ListCreationViewModel {
    public form: UntypedFormGroup = this._fb.group({
        title: ['', Validators.required],
        isAuto: ['false', Validators.required],
        color: ['#ffffff'],
        filters: this._fb.array([]),
    });

    public get addControl() : any {
        return {
            timePeriod: this.addTimePeriodControls(this._fb, this.filters),
            priority: this.addPriorityControls(this._fb, this.filters),
            listAffiliation: this.addListAffiliationControls(this._fb, this.filters),
            completeness: this.addCompletenessControls(this._fb, this.filters),
            // userTag: this.userTag
        };
    }

    constructor (private _fb : UntypedFormBuilder) { }

    public get filters() : UntypedFormArray  {
        return this.form.get('filters') as UntypedFormArray;
    }

    public addFilter() : void {
        const newFilter : UntypedFormGroup = this._fb.group({
            filterType : ['none']
        });

        const filtersControl : UntypedFormArray = this.filters;
        filtersControl.push(newFilter);
    }

    public addTimePeriodControls(formBuilder: UntypedFormBuilder, filterControls: UntypedFormArray) : Function {
        return function (id : number) {
            const inputData : UntypedFormGroup = formBuilder.group({
                startDate: [],
                startTime: [],
                endDate: [],
                endTime: [],
            });

            const filterGroup: UntypedFormGroup = filterControls.controls[id] as UntypedFormGroup;
            filterGroup.addControl('inputData', inputData);
        };
    }

    public addPriorityControls(formBuilder: UntypedFormBuilder, filterControls: UntypedFormArray) : Function {
        return function (id : number) {
            const inputData : UntypedFormGroup = formBuilder.group({
                degrees: [],
            });

            const filterGroup: UntypedFormGroup = filterControls.controls[id] as UntypedFormGroup;
            filterGroup.addControl('inputData', inputData);
        };
    }

    public addListAffiliationControls(formBuilder: UntypedFormBuilder, filterControls: UntypedFormArray) : Function {
        return function (id : number) {
            const inputData : UntypedFormGroup = formBuilder.group({
                listId: [],
            });

            const filterGroup: UntypedFormGroup = filterControls.controls[id] as UntypedFormGroup;
            filterGroup.addControl('inputData', inputData);
        };
    }

    public addCompletenessControls(formBuilder: UntypedFormBuilder, filterControls: UntypedFormArray) : Function {
        return function (id : number) {
            const inputData : UntypedFormGroup = formBuilder.group({
                isCompleted: [],
            });

            const filterGroup: UntypedFormGroup = filterControls.controls[id] as UntypedFormGroup;
            filterGroup.addControl('inputData', inputData);
        };
    }

    public clearInputControl(id : number) : void {
        const filterGroup : UntypedFormGroup = this.filters.controls[id] as UntypedFormGroup;
        filterGroup.removeControl('inputData');
    }

    public removeFilter(id : number) : void {
        this.filters.removeAt(id);
    }

    public toModel(id: number) : IList {
        const isAuto : boolean = this.form.value.isAuto === 'true';
        const creator : IListCreator = isAuto ? new AutoListCreator() : new HandleListCreator();

        return creator.listFromForm(this.form, id);
    }
}
