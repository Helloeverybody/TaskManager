import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { List } from '../models/list.model';

export class ListCreationViewModel{
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        isAuto: new FormControl('false', Validators.required),
        color: new FormControl('#ffffff'),
        filters: new FormArray([]),
    });

    public get filters() : FormArray  {
        return this.form.get('filters') as FormArray;
    }

    public addFilter() : void {
        const newFilter : FormGroup = new FormGroup({
            filterType : new FormControl(),
            filterValue : new FormControl()
        });

        const filtersControl : FormArray = this.form.get('filters') as FormArray;
        filtersControl.push(newFilter);
    }

    public removeFilter(id : number) : void {
        this.filters.removeAt(id);
    }

    public toModel(id: number) : List {
        let filters : [] = this.form.value.filters;
        const isAuto : boolean = this.form.value.isAuto === 'true';
        if (!isAuto) {
            filters = [];
        }

        return {
            title: this.form.value.title,
            id: id,
            color: this.form.value.color,
            isAuto: isAuto,
            isEditable: true,
            filters: filters
        };
    }
}
