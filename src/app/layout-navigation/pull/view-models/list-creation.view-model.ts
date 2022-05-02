import { FormControl, FormGroup, Validators } from '@angular/forms';
import { List } from '../models/list.model';

export class ListCreationViewModel{
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        isAuto: new FormControl('false', Validators.required),
        color: new FormControl('#ffffff'),
    });

    public toModel(id: number) : List {
        return {
            title: this.form.value.title,
            id: id,
            color: this.form.value.color,
            isAuto: this.form.value.isAuto,
            isDeletable: false,
        };
    }
}
