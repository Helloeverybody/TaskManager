import { FormControl, FormGroup, Validators } from '@angular/forms';
import { List } from '../models/list.model';

export class ListEditViewModel{
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        color: new FormControl('#ffffff'),
    });

    public toModel(list : List) : List {
        list.title = this.form.value.title;
        list.color = this.form.value.color;

        return list;
    }

    public fromModel(list: List | undefined) : void {
        if (list === undefined) {
            console.log('Ошибка: список не найден');
        }
        this.form.setValue({ title: list?.title, color: list?.color });
    }
}
