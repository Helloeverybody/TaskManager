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

    constructor (private _fb : FormBuilder) { }

    public get filters() : FormArray  {
        return this.form.get('filters') as FormArray;
    }

    public addFilter() : void {
        const newFilter : FormGroup = this._fb.group({
            filterType : []
        });

        const filtersControl : FormArray = this.filters;
        filtersControl.push(newFilter);
    }

    public addTimePeriodControls(id : number) : void {
        const inputData : FormGroup = this._fb.group({
            startDate: [''],
            startTime: [''],
            endDate: [''],
            endTime: [''],
        });

        const con : FormGroup = this.filters.controls[id] as FormGroup;
        con.addControl('inputData', inputData);
    }

    public removeFilter(id : number) : void {
        this.filters.removeAt(id);
    }

    public toModel(id: number) : IList {
        const isAuto : boolean = this.form.value.isAuto === 'true';
        const creator : IListCreator = isAuto ? new AutoListCreator() : new HandleListCreator();

        console.log(this.form);

        return creator.listFromForm(this.form, id);
    }
}
