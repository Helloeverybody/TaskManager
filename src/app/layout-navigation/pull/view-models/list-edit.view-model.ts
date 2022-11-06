import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HandleList } from '../models/handleList.model';

export class ListEditViewModel{
    public form: UntypedFormGroup = this._fb.group({
        title: ['', Validators.required],
        color: ['#ffffff'],
    });

    constructor (private _fb : UntypedFormBuilder) { }

    public toModel(list : HandleList) : HandleList {
        list.title = this.form.value.title;
        list.color = this.form.value.color;

        return list;
    }

    public fromModel(list: HandleList | undefined) : void {
        if (list === undefined) {
            console.log('Error: list not found');
        }
        this.form.setValue({ title: list?.title, color: list?.color });
    }
}
