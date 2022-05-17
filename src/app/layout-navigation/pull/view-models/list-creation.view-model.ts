import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IList } from '../interfaces/list.interface';
import { AutoListCreator } from '../models/autoListCreator.model';
import { HandleListCreator } from '../models/handleListCreator.model';
import { IListCreator } from '../interfaces/listCreator.interface';

export class ListCreationViewModel {
    public form: FormGroup = this._fb.group({
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

    constructor (private _fb : FormBuilder) { }

    public get filters() : FormArray  {
        return this.form.get('filters') as FormArray;
    }

    public addFilter() : void {
        const newFilter : FormGroup = this._fb.group({
            filterType : ['none']
        });

        const filtersControl : FormArray = this.filters;
        filtersControl.push(newFilter);
        console.log('Все фильтры после добавления фильтра');
        console.log(filtersControl);
    }

    public addTimePeriodControls(formBuilder: FormBuilder, filterControls: FormArray) : Function {
        return function (id : number) {
            const inputData : FormGroup = formBuilder.group({
                startDate: [],
                startTime: [],
                endDate: [],
                endTime: [],
            });

            const filterGroup: FormGroup = filterControls.controls[id] as FormGroup;
            filterGroup.addControl('inputData', inputData);
            console.log('Контролы фильтра с айди после добавления инпут контрола:', id);
            console.log(filterGroup);
        };
    }

    public addPriorityControls(formBuilder: FormBuilder, filterControls: FormArray) : Function {
        return function (id : number) {
            const inputData : FormGroup = formBuilder.group({
                degrees: [],
            });

            const filterGroup: FormGroup = filterControls.controls[id] as FormGroup;
            filterGroup.addControl('inputData', inputData);
            console.log('Контролы фильтра с айди после добавления инпут контрола:', id);
            console.log(filterGroup);
        };
    }

    public addListAffiliationControls(formBuilder: FormBuilder, filterControls: FormArray) : Function {
        return function (id : number) {
            const inputData : FormGroup = formBuilder.group({
                listId: [],
            });

            const filterGroup: FormGroup = filterControls.controls[id] as FormGroup;
            filterGroup.addControl('inputData', inputData);
            console.log('Контролы фильтра с айди после добавления инпут контрола:', id);
            console.log(filterGroup);
        };
    }

    public addCompletenessControls(formBuilder: FormBuilder, filterControls: FormArray) : Function {
        return function (id : number) {
            const inputData : FormGroup = formBuilder.group({
                isCompleted: [],
            });

            const filterGroup: FormGroup = filterControls.controls[id] as FormGroup;
            filterGroup.addControl('inputData', inputData);
            console.log('Контролы фильтра с айди после добавления инпут контрола:', id);
            console.log(filterGroup);
        };
    }

    public clearInputControl(id : number) : void {
        const filterGroup : FormGroup = this.filters.controls[id] as FormGroup;
        filterGroup.removeControl('inputData');
        console.log('Контролы фильтра с айди после очистки инпут контрола:', id);
        console.log(filterGroup);
    }

    public removeFilter(id : number) : void {
        this.filters.removeAt(id);
        console.log('Все фильтры после удаления фильтра');
        console.log(this.filters);
    }

    public toModel(id: number) : IList {
        const isAuto : boolean = this.form.value.isAuto === 'true';
        const creator : IListCreator = isAuto ? new AutoListCreator() : new HandleListCreator();

        console.log(this.form);

        return creator.listFromForm(this.form, id);
    }
}
